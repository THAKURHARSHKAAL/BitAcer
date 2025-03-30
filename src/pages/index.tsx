import { useEffect, useRef } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import * as THREE from 'three';
import { useWeb3 } from '@/contexts/Web3Context';
import Header from '@/components/Header';

export default function Home() {
  const { connect, account } = useWeb3();
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Create a sample 3D land parcel
    const geometry = new THREE.BoxGeometry(1, 0.1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    const landParcel = new THREE.Mesh(geometry, material);

    // Add lights
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    scene.add(landParcel);
    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      landParcel.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <Box>
      <Header />
      <Box
        ref={canvasRef}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />
      <Container
        sx={{
          mt: 8,
          position: 'relative',
          zIndex: 1,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to BitAcer
        </Typography>
        <Typography variant="h5" gutterBottom>
          The Future of Land Trading with NFTs
        </Typography>
        {!account ? (
          <Button
            variant="contained"
            size="large"
            onClick={connect}
            sx={{ mt: 4 }}
          >
            Connect Wallet
          </Button>
        ) : (
          <Button
            variant="contained"
            size="large"
            href="/marketplace"
            sx={{ mt: 4 }}
          >
            Explore Marketplace
          </Button>
        )}
      </Container>
    </Box>
  );
}
