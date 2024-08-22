import React from "react";
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Cookies from 'js-cookie';
import axios from 'axios';


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
  const cookies = Cookies.get('token');


  const fetchData = async () => {
    try {
        const { data } = await axios.get('https://mena.alraed1.com/checkRole', {
            headers: {
                'Content-Type': 'application/json',
                'theToken': `Bearer ${cookies}`
            }
        });

        if (data.user_id) {
          console.log('mina');
        }else{
          navigate('/loginpage');
        }
    } catch (error) {
      console.log('hello');

    }
};
  const handleCardClick = () => {

    
    switch (item.title) {
      case 'Houseware':
        fetchData();
        navigate("/houseware");
        break;
      case 'Office Ware':
        fetchData();
        navigate("/officeware");
        break;
      case 'Electronics':
        fetchData();
        navigate("/electronics");
        break;
      case 'Furniture':
        fetchData();
        navigate("/furniture");
        break;
      case 'Car Accessories':
        fetchData();
        navigate("/carAccessories");
        break;
      case 'Books':
        fetchData();
        navigate("/books");
        break;
      case 'Antiques':
        fetchData();
        navigate("/antiques");
        break;
      case 'Electrical Devices':
        fetchData();
        navigate("/electricalDevices");
        break;
      default:
        break;
    }
  };

  return (
    <StyledCard style={{backgroundColor:'white'}}>
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