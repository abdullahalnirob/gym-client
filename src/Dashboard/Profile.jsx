import React from 'react';
import useAuth from '../hook/useAuth';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Divider,
} from '@mui/material';

const Profile = () => {
    const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); // 0-based
const year = today.getFullYear();

const formattedDate = `${day}/${month}/${year}`;
  const { user } = useAuth();

  return (
    <Box className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <Box className="max-w-xl mx-auto">
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          My Profile
        </Typography>

        <Paper elevation={3} className="p-6 rounded-lg">
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Avatar
              src={user?.photoURL || '/avatar.png'}
              alt={user?.displayName || 'User Avatar'}
              sx={{ width: 100, height: 100 }}
              onError={(e) => (e.target.src = '/avatar.png')}
            />
            <Typography variant="h6" fontWeight="bold">
              {user?.name || 'N/A'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.email || 'N/A'}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box className="space-y-2">
            <Typography>
              <strong>Role:</strong> {user?.role || 'user'}
            </Typography>

            <Typography>
              <strong>Last Login:</strong>{' '}
             {`${day}/${month}/${year}`}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Profile;
