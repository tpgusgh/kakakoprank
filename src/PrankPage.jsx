import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";

const kakaoApiKey = import.meta.env.VITE_KAKAO_API_KEY;



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const StyledCard = styled.div`
  padding: 24px;
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled.button`
  padding: 12px 16px;
  font-size: 18px;
  background-color: ${(props) => (props.secondary ? "#6b7280" : "#3b82f6")};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 12px;
  &:hover {
    background-color: ${(props) => (props.secondary ? "#4b5563" : "#2563eb")};
  }
`;

export default function PrankPage() {
  const [pranked, setPranked] = useState(false);

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoApiKey);
    }
  }, []);

  const sendFoolMessage = () => {
    if (window.Kakao) {
      window.Kakao.Link.sendCustom({
        templateId: 119565,
      });
    }
  };

  return (
    <Container>
      <StyledButton onClick={sendFoolMessage}>카카오톡으로 공유하기</StyledButton>
      <StyledCard>
        {!pranked ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">진짜겠어요?</h1>
            <StyledButton onClick={() => setPranked(true)}>눌러보기</StyledButton>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <AlertTriangle size={48} color="#ef4444" className="mx-auto mb-4" />
            <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#dc2626" }}>속았지? 😂</h1>
            <p style={{ color: "#6b7280", marginTop: "8px" }}>속으셨네요~~!</p>
            <StyledButton secondary onClick={() => setPranked(false)}>다시 해보기</StyledButton>
            
          </motion.div>
        )}
      </StyledCard>
      <Analytics />
    </Container>
  );
}
