import {
  Grid,
  Modal,
  Paper,
  Typography,
  Container,
  Button,
  TextField,
  Card,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonAppBar from "../components/AppBar";
import styled from "styled-components";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@mui/icons-material";

const CardList = styled(Card)`
  padding: 24px;
  height: 100%;
  font-family: Poppins;
`;
const CardAdd = styled(Card)`
  padding: 24px;
`;
const LinkItem = styled.a`
  color: #fffff;
  background-color: #b27de3;
  margin-top: 8px;

  &:hover {
    background-color: #0e0b9b;
    cursor: pointer;
  }
`;
const ButtonAdd = styled(Button)`
  &&& {
    padding: 16px;
    color: #ffff;
    background-color: #b27de3;
    text-transform: none;
    margin-top: 16px;

    &:hover {
      background-color: #0e0b9b;
      cursor: pointer;
    }
  }
`;
const ButtonUrl = styled(Button)`
  &&& {
    color: #ffffff;
  background-color: #b27de3;
  margin-top: 8px;
  text-transform: none;

  &:hover {
    background-color: #0e0b9b;
    cursor: pointer;
  }
  }
`;
function generateRandomCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const codeLength = 8; // Kod uzunluğunu istediğiniz gibi ayarlayabilirsiniz
  let code = "";

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}

function Property() {
  const [properties, setProperties] = useState([]); // Property listesi
  const [urlInput, setUrlInput] = useState(""); // Kullanıcıdan URL girişini saklamak için state
  const [uniqueCode, setUniqueCode] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState("");

  const handleAddProperty = () => {
    // Yeni bir property eklemek için kullanılacak fonksiyon
    const newProperty = {
      id: Date.now(), // Örnek bir ID (genellikle veritabanından gelir)
      name: "Yeni Property", // Property adı (düzenlemek için bir input ekleyebilirsiniz)
    };

    // Yeni property'i mevcut listeye ekleyin
    setProperties([...properties, newProperty]);
  };

  const handleUrlInputChange = (event) => {
    setUrlInput(event.target.value);
  };

  const addPropertyToDatabase = async (url, code) => {
    try {
      const response = await fetch(
        "http://localhost:3000/performance_data/entities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url, code, token }),
        }
      );

      if (response.ok) {
        console.log("Property added to the database successfully.");
        setUniqueCode(code);
        setOpenModal(true);
      } else {
        console.error("Failed to add property to the database.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleGenerateCode = () => {
    const url = urlInput.trim();

    if (!url) {
      return;
    }

    const randomCode = generateRandomCode();

    // Veriyi veritabanına ekleyin
    addPropertyToDatabase(url, randomCode);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(uniqueCode)
      .then(() => {
        alert("Kod kopyalandı: " + uniqueCode);
      })
      .catch((error) => {
        console.error("Kopyalama başarısız oldu:", error);
        alert(
          "Kopyalama başarısız oldu. Lütfen manuel olarak kopyalayın: " +
            uniqueCode
        );
      });
  };
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    }
    setToken(token);
    // Veritabanından verileri çekmek için bir API isteği yapın (örneğin, GET isteği ile)
    fetch("http://localhost:3000/performance_data/getentities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP Hatası: " + response.status);
        }
        return response.json(); // Yanıtı JSON olarak çözümle
      })
      .then((data) => {
        // data içindeki JSON verilerini kullanabilirsiniz
        console.log(data);
        setProperties(data);
      })
      .catch((error) => {
        console.error("Veri çekme hatası:", error);
      });
  }, []);

  return (
    <div>
      <ButtonAppBar />
      <Container
        style={{
          padding: "16px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Grid container spacing={2} justify="center">
          <Grid item md={2} />
          <Grid item md={4}>
            <CardList>
              <h1
                style={{
                  fontFamily: "Poppins",
                }}
              >
                My Properties
              </h1>
              <ul>
                {properties.map((property) => (
                  <p key={property._id}>
                    {" "}
                    <ButtonUrl onClick={() => {
          navigate('/home?code='+property.code);
        }}>{property.url}</ButtonUrl>{" "}
                  </p>
                  // Yukarıdaki kod, veritabanından gelen URL'leri My Properties listesine ekler
                ))}
              </ul>
            </CardList>
          </Grid>
          <Grid item md={4}>
            <CardAdd>
              {" "}
              <h1>Add Property</h1>
              <TextField
                label="URL"
                variant="outlined"
                fullWidth
                value={urlInput}
                onChange={handleUrlInputChange}
              />
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {" "}
                <ButtonAdd onClick={handleGenerateCode}>Add</ButtonAdd>
              </div>
            </CardAdd>
          </Grid>
        </Grid>
      </Container>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Paper
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "16px",
          }}
        >
          <Typography variant="h6">Your Code</Typography>
          <Typography variant="body1">{uniqueCode}</Typography>
          <Button onClick={handleCopyCode}>Kopyala</Button>
        </Paper>
      </Modal>
    </div>
  );
}

export default Property;
