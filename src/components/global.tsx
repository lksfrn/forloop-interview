import styled from "@emotion/styled";

export const Dashboard = styled.main({
  display: "grid",
//   backgroundColor: "lightcyan",
  minHeight: "100vh",
  fontFamily: "sans-serif",
  gridTemplateColumns: "calc(10rem + 20px) 1fr",
  overflowX: "hidden",

  section: {
    // backgroundColor: "lightgrey",
    width: "100%",
    overflow: "hidden"
  },
});

export const Menu = styled.nav({
  width: "calc(10rem + 20px)",
  backgroundColor: "lightcoral",
  zIndex: 10,
  padding: '10px',

  ul: {
    margin: 0,
    li: {
      padding: "1rem",
      cursor: "pointer",

      "&:hover": {
        backgroundColor: "lightgreen",
      },
    },
  },
});
