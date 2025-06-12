import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Fade,
  Paper,
  Typography,
} from "@mui/material";
import { User } from "../../models/User.model";
import { useParams } from "react-router-dom";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { UserContext } from "../../context/UserContext";
import MemeCard from "../MemeCard";
import { saveAvatar } from "../../../services/UserService";
import { Meme } from "../../models/Meme.model";
import { getMemes } from "../../../services/MemeService";
import toast from "react-hot-toast";

export default function Profile(props: { userData: User }) {
  const userContext = useContext(UserContext);

  const user = props.userData;

  const [memes, setMemes] = useState<Meme[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [hovering, setHovering] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(1);
  const memesPerPage = 10;
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const isOwnProfile =
    userContext && userContext.user && user.id
      ? user.id === userContext.user.id
      : false;

  useEffect(() => {
    if (!props.userData.id) return;

    getMemes("new", page, [], props.userData.id)
      .then((res) => {
        const newMemes = res.data;
        setMemes(res.data);
        setHasMore(newMemes.length === memesPerPage);
      })
      .catch((err) => {
        console.error("Errore nel caricamento dei meme: ", err);
        setMemes([]);
      });
  }, [page, props.userData.id]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setShowConfirm(true);
    }
  };

  const handleConfirm = useCallback(async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    if (!userContext?.user?.id) return;

    try {
      const response = await saveAvatar(userContext.user.id, selectedFile);
      //aggiorna lo user nel context con nuova immagine
      if (userContext.user) {
        const updatedUser = {
          ...userContext.user,
          profileImage: response.data.profileImage,
        };
        userContext.setUser(response.data);
      }
      setShowConfirm(false);
      setSelectedFile(null);
      toast.success("Avatar aggiornato con successo!");
    } catch (err) {
      console.error("Errore upload: ", err);
    }
  }, [selectedFile, userContext]);

  return (
    <Fade in={!fadeOut}>
      <Box sx={{ maxWidth: "700px", margin: "auto", p: { xs: 2, sm: 5 } }}>
        <Paper
          sx={{
            p: 3,
            mb: 4,
            backgroundColor: "#1e2936",
            borderRadius: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
          elevation={3}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            width="100%"
            justifyContent="center"
          >
            <Box
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              sx={{
                position: "relative",
                cursor: isOwnProfile ? "pointer" : "default",
              }}
              onClick={() => {
                if (isOwnProfile && fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
            >
              <Avatar
                src={
                  isOwnProfile
                    ? `http://localhost:3000/${userContext?.user?.profileImage}`
                    : `http://localhost:3000/${props.userData.profileImage}`
                }
                sx={{ width: 100, height: 100 }}
                alt={userContext?.user?.userName}
              />
              {hovering && isOwnProfile && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                  }}
                >
                  Modifica Avatar
                </Box>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Box>

            <Box>
              <Typography variant="h4" color="white" fontWeight="bold">
                {props.userData.userName}
              </Typography>
              {isOwnProfile && selectedFile && (
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={handleConfirm}
                >
                  Conferma Avatar
                </Button>
              )}
            </Box>
          </Box>
        </Paper>

        <Typography variant="h4" color="white" fontWeight="bold">
          Meme pubblicati
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {memes === null ? (
          <CircularProgress />
        ) : memes.length === 0 ? (
          <Typography>Nessun meme pubblicato.</Typography>
        ) : (
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={3}
            alignItems={"center"}
            mt={2}
          >
            {memes.map((meme, index) => (
              <MemeCard meme={meme} key={meme.id} memeIndex={index} />
            ))}
          </Box>
        )}
        {(page > 0 || hasMore) && (
          <Box
            display={"flex"}
            flexDirection="row"
            justifyContent={"center"}
            mt={4}
            gap={2}
          >
            {page > 1 && (
              <Button
                variant="outlined"
                onClick={() => setPage((prev) => prev - 1)}
              >
                Indietro
              </Button>
            )}

            {hasMore && (
              <Button
                variant="outlined"
                onClick={() => setPage((prev) => prev + 1)}
              >
                Avanti
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Fade>
  );
}
