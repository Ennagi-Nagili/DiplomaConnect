import { Link } from 'react-router-dom';
import { Typography, Button, Container } from '@mui/material';

const NotFound = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" paragraph>
        Oops! The page you're looking for could not be found.
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        The page may have been moved, deleted, or never existed.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;
