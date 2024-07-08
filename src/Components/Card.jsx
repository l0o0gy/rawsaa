import React from "react";
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  marginBottom: theme.spacing(4),
  marginLeft: theme.spacing(1),
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
});

function PostCard({ item }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    switch (item.title) {
      case 'Houseware':
        navigate("/houseware");
        break;
      case 'Office Ware':
        navigate("/officeware");
        break;
      case 'Electronics':
        navigate("/electronics");
        break;
      case 'Furniture':
        navigate("/furniture");
        break;
      case 'Car Accessories':
        navigate("/carAccessories");
        break;
      case 'Books':
        navigate("/books");
        break;
      case 'Antiques':
        navigate("/antiques");
        break;
      case 'Electrical Devices':
        navigate("/electricalDevices");
        break;
      default:
        break;
    }
  };

  return (
    <StyledCard>
      <CardActionArea onClick={handleCardClick}>
        <StyledCardMedia
          component="img"
          image={item.img}
          alt={item.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
}

export default PostCard;
