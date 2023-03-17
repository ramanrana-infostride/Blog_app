import { Box, Typography, styled } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API } from "../../service/Api";
import { Delete, Edit } from "@mui/icons-material";
import { DataContext } from "../../context/DataProvider";
import Comments from "./comments/Comments";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md ")]: {
    margin: "0",
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
  word-break: break-word;
`;

const Description = styled(Typography)`
  word-break: break-word;
`;

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const Author = styled(Box)(({ theme }) => ({
  color: "#878787",
  display: "flex",
  margin: "20px 0",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const DetailView = () => {
  const [post, setPost] = useState({});

  const { id } = useParams();
  const { account } = useContext(DataContext);
  const navigate = useNavigate();

  const imageUrl = post.picture
    ? post.picture
    : `https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

  const DeleteBlog = async () => {
    let response = await API.deletePost(post._id);
    if (response.isSuccess) {
      navigate("/");
    }
  };

  return (
    <Container>
      <Image src={imageUrl} alt="blog" />
      <Box style={{ float: "right" }}>
        {account.name === post.username && (
          <>
            <Link to={`/update/${post._id}`}>
              {" "}
              <EditIcon color="primary" />
            </Link>
            <DeleteIcon onClick={DeleteBlog} color="error" />
          </>
        )}
      </Box>

      <Heading>{post.title}</Heading>
      <Author>
        {/* <Link
          to={`/?username=${post.username}`}
          style={{ textDecoration: "none", color: "inherit" }}
        > */}
        <Typography>
          Author: <span style={{ fontWeight: 600 }}>{post.username}</span>
        </Typography>
        {/* </Link> */}
        <Typography style={{ marginLeft: "auto" }}>
          {new Date(post.createdDate).toDateString()}
        </Typography>
      </Author>
      <Description>{post.description}</Description>

      <Comments post ={post}/>
    </Container>
  );
};

export default DetailView;
  