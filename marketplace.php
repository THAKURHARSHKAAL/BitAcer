<?php
require_once 'config/database.php';
session_start();

// Fetch available NFTs
$stmt = $conn->prepare("SELECT n.*, u.username as owner_name FROM nfts n 
                       LEFT JOIN users u ON n.owner_id = u.id 
                       WHERE is_listed = true 
                       ORDER BY created_at DESC");
$stmt->execute();
$nfts = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marketplace - BitAcer</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <style>
        .marketplace {
            padding: 80px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .nft-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 2rem;
            padding: 2rem 0;
        }

        .nft-card {
            background: var(--surface-color);
            border-radius: 12px;
            overflow: hidden;
            transition: transform 0.3s ease;
        }

        .nft-card:hover {
            transform: translateY(-5px);
        }

        .nft-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }

        .nft-info {
            padding: 1rem;
        }

        .nft-title {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
        }

        .nft-price {
            color: var(--primary-color);
            font-weight: bold;
        }

        .nft-owner {
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.7);
        }

        .filters {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
        }
    </style>
</head>
<body>
    <?php include 'includes/header.php'; ?>

    <main class="marketplace">
        <h1>NFT Marketplace</h1>
        
        <div class="filters">
            <input type="text" id="search" placeholder="Search NFTs...">
            <select id="sort">
                <option value="latest">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
            </select>
        </div>

        <div class="nft-grid">
            <?php foreach ($nfts as $nft): ?>
                <div class="nft-card">
                    <img src="<?php echo htmlspecialchars($nft['image_url']); ?>" alt="<?php echo htmlspecialchars($nft['title']); ?>" class="nft-image">
                    <div class="nft-info">
                        <h3 class="nft-title"><?php echo htmlspecialchars($nft['title']); ?></h3>
                        <p class="nft-price"><?php echo $nft['price']; ?> ETH</p>
                        <p class="nft-owner">Owned by <?php echo htmlspecialchars($nft['owner_name']); ?></p>
                        <?php if (isset($_SESSION['user_id']) && $_SESSION['user_id'] != $nft['owner_id']): ?>
                            <button class="btn btn-primary" onclick="purchaseNFT('<?php echo $nft['token_id']; ?>', <?php echo $nft['price']; ?>)">
                                Purchase
                            </button>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </main>

    <?php include 'includes/footer.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/web3@1.5.2/dist/web3.min.js"></script>
    <script>
        async function purchaseNFT(tokenId, price) {
            if (typeof window.ethereum === 'undefined') {
                alert('Please install MetaMask to purchase NFTs!');
                return;
            }

            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const userAccount = accounts[0];
                
                // Here you would typically interact with your smart contract
                // This is a placeholder for the actual smart contract interaction
                console.log(`Purchasing NFT ${tokenId} for ${price} ETH`);
                
                // After successful purchase, reload the page
                // window.location.reload();
                
            } catch (error) {
                console.error('Error purchasing NFT:', error);
                alert('Error purchasing NFT. Please try again.');
            }
        }

        // Search functionality
        document.getElementById('search').addEventListener('input', function(e) {
            const search = e.target.value.toLowerCase();
            document.querySelectorAll('.nft-card').forEach(card => {
                const title = card.querySelector('.nft-title').textContent.toLowerCase();
                card.style.display = title.includes(search) ? 'block' : 'none';
            });
        });

        // Sort functionality
        document.getElementById('sort').addEventListener('change', function(e) {
            const cards = Array.from(document.querySelectorAll('.nft-card'));
            const container = document.querySelector('.nft-grid');
            
            cards.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.nft-price').textContent);
                const priceB = parseFloat(b.querySelector('.nft-price').textContent);
                
                if (e.target.value === 'price-low') {
                    return priceA - priceB;
                } else if (e.target.value === 'price-high') {
                    return priceB - priceA;
                }
                return 0;
            });
            
            container.innerHTML = '';
            cards.forEach(card => container.appendChild(card));
        });
    </script>
</body>
</html>
