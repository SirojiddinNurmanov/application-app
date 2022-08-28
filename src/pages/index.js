import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fireAuth } from "../service/firebase";
import Nav from "../components/nav"
import Form from "../components/form"
import { requestGraphql, requestLink } from "../../utils";
import { getAllLinks, sendLink, upvote } from "../../helpers";
import Link from "next/dist/client/link";

export default function Index() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState([])
  const [totalLinks, setTotalLinks] = useState(0)
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")
  const [token, setToken] = useState("")
  const [number, setNumber] = useState(-1)
  const router = useRouter()
  useEffect(() => {
    const item = localStorage.getItem("token")
    setToken(item)
  }, [])

  const onSubmitLink = () => requestLink(sendLink({ url, description }), token)
    .then((data) => {
      console.log(data)
      console.log("send link")
    })

  const getLinks = () => requestGraphql(getAllLinks())
    .then((data) => {
      console.log(data)
      setLinks(data.data.feed.links)
      setTotalLinks(data.data.feed.count)
    })
  const upvoteLinks = (id) => requestLink(upvote({ id }), token)
    .then((data) => {
      console.log(id)
      console.log("upvote", data)

    })


  return (

    <div className="container">
      <div className="row1">
        <Heading as="h1" >  <img style={{ width: "40px" }} src='/static/img/favicon.png' sx={{ boxShadow: 3 }}></img></Heading>
        <div>
          <Link href="/login">
            <Button variant="link" m="0px 20px">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="solid" backgroundColor="brand.blue" color="white">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="button-area">
            <button
              onClick={getLinks}
            >Show all links</button>
            <button
              onClick={() => setLinks({})}
            >Close</button>
          </div>

          <h5>{`Total links:  ${totalLinks}`}</h5>
          <div className="link-area">
            {
              links && links.length > 0 && links.map(({ id, description, postedBy, votes }) => (
                <div className="link" key={id}>
                  <div className="link-container">
                    <span>{`${id}`}</span>
                    <span>{`${description}`}</span>
                  </div>
                  <div className="link-aut">
                    <img src="/static/img/arrow-upward.png" onClick={() => upvoteLinks(id)} />
                    <div onClick={() => setNumber(id)} className="link-aut-2">
                      <span className="upvote-user">S</span>
                      <span className="upvote-user">N</span>
                      <span className="upvote-user">F</span>
                      <span className="upvote-users"> {votes.length > 0 ? `...${votes.length} more upvotes` : "...no votes"}</span>
                    </div>

                  </div>
                  <div className={number === id ? "upvote-desc active" : "upvote-desc"}>
                    <p>{`Users who upvoted: ${description}`}</p>
                    {votes.length > 0 && votes.map(({ id, user }) => (
                      <div key={id} className="user-vote">{user.name}</div>
                    ))}
                  </div>
                </div>
              )

              )
            }
          </div>
        </div>
        <div className="col-6">
          <div className="add-link">
            <Box border="2px solid" w="lg" borderColor="brand.blue" rounded={12} p={8}>
              <Stack spacing={4} mt={8}>
                <h3>Post a new link</h3>
                <Input
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="url"
                  isRequired
                  type="text"
                />
                <Input
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="description"
                  isRequired
                  type="text"
                />
                <Button
                  type="submit"
                  w="full"
                  variant="solid"
                  backgroundColor="brand.blue"
                  color="white"
                  onClick={onSubmitLink}
                >
                  Continue
                </Button>

              </Stack>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );


}
