let web3;
let userAccount;

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            web3 = new Web3(window.ethereum);
            
            // Update UI
            document.getElementById('connectWallet').style.display = 'none';
            document.getElementById('walletAddress').textContent = 
                userAccount.slice(0, 6) + '...' + userAccount.slice(-4);
            
            // Save wallet address to session
            await fetch('includes/save_wallet.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ wallet: userAccount })
            });

        } catch (error) {
            console.error('User denied account access:', error);
        }
    } else {
        alert('Please install MetaMask!');
    }
}

// Handle wallet button click
document.getElementById('connectWallet').addEventListener('click', connectWallet);

// Handle account changes
if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', function (accounts) {
        if (accounts.length > 0) {
            userAccount = accounts[0];
            document.getElementById('walletAddress').textContent = 
                userAccount.slice(0, 6) + '...' + userAccount.slice(-4);
        } else {
            document.getElementById('connectWallet').style.display = 'block';
            document.getElementById('walletAddress').textContent = '';
        }
    });
}

// Modal functionality
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
}

// Close button functionality
document.querySelectorAll('.close').forEach(button => {
    button.onclick = function() {
        this.closest('.modal').style.display = 'none';
    }
});
