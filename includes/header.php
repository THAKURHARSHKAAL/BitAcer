<?php
session_start();
require_once 'config/database.php';
?>
<header class="main-header">
    <nav class="navbar">
        <div class="logo">
            <a href="index.php">BitAcer</a>
        </div>
        <ul class="nav-links">
            <li><a href="marketplace.php">Marketplace</a></li>
            <li><a href="mint.php">Mint NFT</a></li>
            <?php if(isset($_SESSION['user_id'])): ?>
                <li><a href="dashboard.php">My Properties</a></li>
                <li><a href="profile.php">Profile</a></li>
            <?php endif; ?>
        </ul>
        <div class="auth-buttons">
            <?php if(!isset($_SESSION['user_id'])): ?>
                <button class="btn btn-login" onclick="openLoginModal()">Login</button>
                <button class="btn btn-register" onclick="openRegisterModal()">Register</button>
            <?php else: ?>
                <span class="wallet-address" id="walletAddress"></span>
                <a href="logout.php" class="btn btn-logout">Logout</a>
            <?php endif; ?>
        </div>
    </nav>
</header>

<!-- Login Modal -->
<div id="loginModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Login</h2>
        <form id="loginForm" action="includes/login.php" method="POST">
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
</div>
