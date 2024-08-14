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
    const [isBookmarked, setIsBookmarked] = useState(() => {
        const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
        return savedPosts.some(savedPost => savedPost.id === postId);
    });

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await axios.get(`https://mena.alraed1.com/userInfo/${userid}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchInfo();
    }, [userid]); 

    const handleBookmarkClick = () => {
        let savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];

        if (!isBookmarked) {
            savedPosts = [...savedPosts, post];
            console.log(savedPosts)
            localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
            setIsBookmarked(true);
        } else {
            savedPosts = savedPosts.filter(savedPost => savedPost.id !== postId);
            localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
            setIsBookmarked(false);
        }
    };

    return (
        <ThemeProvider theme={theme} sx={{ overflow: "hidden" }}>
            <CardHeader
                sx={{ height: { xs: 80 } }}

                avatar={
                    <Avatar
                        src={data.img_id !== 0 ? `https://mena.alraed1.com/imgUsers/${data.img_id}.jpg` : `https://ui-avatars.com/api/?name=mena+thaer&background=22d3ee&color=fff`}
                        alt="User Avatar"
                        lg={{ width: { xs: 100, sm: 200, xl: 200 }, height: { xs: 100, sm: 200, xl: 200 } }}
                    />
                }
                action={
                    <IconButton onClick={handleBookmarkClick} aria-label="bookmark">
                        {isBookmarked ? <BookmarkAddedIcon style={{ color: "#fa7305" }} /> : <BookmarkAddIcon />}
                    </IconButton>
                }
                title={post.first_name + ' ' + post.last_name}
                subheader={date}
            />
        </ThemeProvider>
    );
}
