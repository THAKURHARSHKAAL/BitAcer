import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { useWeb3 } from '@/contexts/Web3Context';
import Link from 'next/link';

export default function Header() {
  const { account, connect, disconnect } = useWeb3();

  return (
    <AppBar position="fixed" color="transparent" sx={{ backdropFilter: 'blur(20px)' }}>
      <Toolbar>
        <Link href="/" passHref>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
          >
            BitAcer
          </Typography>
        </Link>
        
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Link href="/marketplace" passHref>
            <Button color="inherit">Marketplace</Button>
          </Link>
          <Link href="/mint" passHref>
            <Button color="inherit">Mint NFT</Button>
          </Link>
          {account && (
            <Link href="/dashboard" passHref>
              <Button color="inherit">My Properties</Button>
            </Link>
          )}
        </Box>

        {account ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              {`${account.slice(0, 6)}...${account.slice(-4)}`}
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              onClick={disconnect}
            >
              Disconnect
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={connect}
          >
            Connect Wallet
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
