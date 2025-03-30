<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BitAcer - NFT Land Marketplace</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="https://cdn.jsdelivr.net/npm/web3@1.5.2/dist/web3.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.137.0/build/three.min.js"></script>
</head>
<body>
    <?php include 'includes/header.php'; ?>

    <main class="hero">
        <div id="canvas-container"></div>
        <div class="hero-content">
            <h1>Welcome to BitAcer</h1>
            <p>Discover and Trade Unique Land NFTs</p>
            <div class="cta-buttons">
                <button id="connectWallet" class="btn btn-primary">Connect Wallet</button>
                <a href="marketplace.php" class="btn btn-secondary">Explore Marketplace</a>
            </div>
        </div>
    </main>

    <?php include 'includes/footer.php'; ?>

    <script src="assets/js/web3-connect.js"></script>
    <script src="assets/js/3d-visualization.js"></script>
</body>
</html>
