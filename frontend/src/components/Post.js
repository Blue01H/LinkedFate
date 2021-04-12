import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { get } from "../controllers/post";
import { userEvent } from "../controllers/user";
import useAsync from "../helpers/process";
import SendEmail from "./Send";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

function Posts({ user, byUser = undefined, displayTextOffer = false }) {
  const [postProcess, setPost] = useAsync();
  const [page, setPage] = useState([]);
  const [actualPage, setActualPage] = useState(-1);
  const [count, setCount] = useState(0);
  const scrollRef = useRef();

  useEffect(() => {
    if (actualPage >= 0) {
      setPost(async () => {
        const posts = byUser
          ? await get(actualPage, undefined, byUser)
          : await get(actualPage);
        return posts;
      });
    }
  }, [actualPage]);

  function next() {
    if (page.length < count || actualPage == -1) setActualPage(actualPage + 1);
  }

  useEffect(() => {
    if (page.length == 0 && postProcess.status == "unitialized") {
      next();
    }
    if (
      postProcess.status == "end" &&
      !postProcess.error &&
      postProcess.result
    ) {
      const { result } = postProcess;
      const pagesId = page.map((page) => page.id);
      const rowsId = result.rows.map((page) => page.id);
      let duplicateId = false;
      for (const id of pagesId) {
        if (rowsId.includes(id)) duplicateId = true;
      }
      if (!duplicateId) {
        setCount(result.count);
        const pages = [...page, ...result.rows];
        setPage(pages);
      }
    }
  }, [postProcess]);

  return (
    <ScrollView
      ref={scrollRef}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          if (scrollRef && scrollRef.current) {
            scrollRef.current.scrollTo({ y: nativeEvent.contentOffset.y });
          }
          next();
        }
      }}
      scrollEventThrottle={400}
      style={styles.scrollContainer}
    >
      {postProcess.isLoading && (
        <ActivityIndicator size="large" color="#0000ff" animating />
      )}
      {!postProcess.isLoading &&
        page.map((page, index) => (
          <View
            style={styles.square}
            key={page.id ? `page-${page.id}` : `page-${index}`}
          >
            <View style={{ position: "relative" }}>
              <View
                style={{
                  position: "relative",
                  width: "100%",
                  textAlign: "center",
                  padding: "2%",
                }}
              >
                {displayTextOffer && (
                  <Text
                    style={{
                      paddingTop: 5,
                      fontFamily: "sans-serif",
                    }}
                  >
                    {user && user.role && user.role == "employee"
                      ? "New job offer!"
                      : "Possible employee for your job!"}
                  </Text>
                )}
                <Text style={{ fontFamily: "sans-serif" }}>
                  From: {`${page.user.names} ${page.user.surnames}`}
                </Text>
              </View>
              <View
                style={{
                  position: "relative",
                  width: "96%",
                  textAlign: "justify",
                  padding: "2%",
                  margin: "2%",
                  backgroundColor: "#fff",
                }}
              >
                <Text style={{ fontFamily: "sans-serif" }}>{page.content}</Text>
              </View>
              {page.user.id !== byUser && <SendEmail id={page.user.id} />}
            </View>
          </View>
        ))}
    </ScrollView>
  );
}
export default Posts;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  scrollContainer: {
    backgroundColor: "#fff",
    height: 500,
    marginTop: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#888",
  },
  avatarContainer: {
    paddingLeft: 8,
    paddingTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    height: 45,
    width: 223,
    color: "#000",
    paddingLeft: 18,
    borderColor: "#fff",
    borderWidth: 1,
  },
  square: {
    width: 47,
    height: 28,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginTop: 10,
    width: "90%",
    height: 200,
    alignSelf: "center",
  },
  avatarPost: {
    width: 40,
    height: 40,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#888",
    marginTop: 15,
    marginLeft: 15,
  },
  logoutContainer: {
    marginLeft: 10,
    width: 60,
    flexDirection: "row",
  },
  usernameText: {},
  logoSpace: {
    marginTop: 35,
    flexDirection: "row",
    paddingLeft: 10,
  },
  logoSquare: {
    width: 47,
    height: 24,
    backgroundColor: "#2867B2",
    borderRadius: 5,
    paddingLeft: 3,
  },
  logoText: {
    fontFamily: "sans-serif",
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  baseText: {
    fontFamily: "sans-serif",
    fontSize: 20,
    color: "#2867B2",
    fontWeight: "bold",
  },
  logoutText: {
    fontFamily: "sans-serif",
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
  },
});
