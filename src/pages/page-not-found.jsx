import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import notFoundIllustration from "../assets/images/notFoundIllustration/illustration_404.svg";
// ----------------------------------------------------------------------

export default function NotFoundPage() {
  return (
    <>
      {/* <Helmet>
        <title> 404 Page Not Found </title>
      </Helmet> */}

      <Box
        component="header"
        sx={{
          top: 0,
          left: 0,
          width: 1,
          lineHeight: 0,
          position: "fixed",
          p: (theme) => ({
            xs: theme.spacing(3, 3, 0),
            sm: theme.spacing(5, 5, 0),
          }),
        }}
      ></Box>

      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: "auto",
            display: "flex",
            minHeight: "100vh",
            textAlign: "center",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>

          <Box
            component="img"
            src={notFoundIllustration}
            sx={{
              mx: "auto",
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />

          <Button href="/home" size="large" variant="contained">
            Go to home
          </Button>
        </Box>
      </Container>
    </>
  );
}
