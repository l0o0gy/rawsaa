import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { CardHeader, IconButton, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

const theme = createTheme();

export default function UserInfoPost({ userid, date, postId, post }) {
    const [data, setData] = useState({});
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await axios.get(`https://mena.al-massrah.com/userInfo/${userid}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchInfo();
    }, [userid]);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
        const bookmarked = savedPosts.some(savedPost => savedPost.id === postId);
        setIsBookmarked(bookmarked);
    }, [postId]);

    const handleBookmarkClick = () => {
        let savedPosts = JSON.parse(localStorage.getItem("savedPosts"));
    
        if (!isBookmarked) {
          if (savedPosts !== null) {
            savedPosts = [...savedPosts, post];
          }else{
            savedPosts = [post];
          }
          console.log(savedPosts);
          localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
          setIsBookmarked(true);
        } else {
          savedPosts = savedPosts.filter((savedPost) => savedPost.id !== postId);
          localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
          setIsBookmarked(false);
        }
      };

    return (
        <ThemeProvider theme={theme} sx={{ overflow: "hidden" }}>
            <CardHeader
                sx={{
                    height: { xs: 80 },
                    '& .MuiCardHeader-title': {
                        fontSize: { xs: "15px", sm: "18px", md: "auto" },
                        marginLeft: { xs: '-15px', sm: "auto" }
                    },
                    '& .MuiCardHeader-subheader': {
                        fontSize: { xs: "12px", sm: "18px", md: "auto" },
                        marginLeft: { xs: '-15px', sm: "auto" }
                    }
                }}
                avatar={
                    <Avatar
                        src={data.img_id != 0
                            ? `https://mena.al-massrah.com/imgUsers/${data.img_id}.jpg`
                            : `https://ui-avatars.com/api/?name=${data.first_name}+${data.last_name}&background=22d3ee&color=fff`}
                        alt="User Avatar"
                        lg={{ width: { xs: 100, sm: 200, xl: 200 }, height: { xs: 100, sm: 200, xl: 200 } }}
                    />
                }
                action={
                    <IconButton onClick={handleBookmarkClick} aria-label="bookmark">
                        {isBookmarked
                            ? <BookmarkAddedIcon style={{ color: "#fa7305" }} />
                            : <BookmarkAddIcon />}
                    </IconButton>
                }
                title={`${data.first_name} ${data.last_name}`}
                subheader={date}
            />
        </ThemeProvider>
    );
}
