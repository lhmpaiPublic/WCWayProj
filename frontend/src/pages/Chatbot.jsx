// Chatbot.jsx
import { useState } from "react"
import { Box, Typography, TextField, IconButton, Paper } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import styled from "@emotion/styled"
import { api } from "../common/axiosapi"

// Emotion Styled Components
const ChatContainer = styled(Paper)`
  width: 100%;
  max-width: 600px;
  height: 80vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
`

const MessagesContainer = styled(Box)`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f9f9f9;
`

const MessageBubble = styled(Box)`
  max-width: 70%;
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 12px;
  background-color: ${(props) => (props.fromUser ? "#6c63ff" : "#e0e0e0")};
  color: ${(props) => (props.fromUser ? "#fff" : "#000")};
  align-self: ${(props) => (props.fromUser ? "flex-end" : "flex-start")};
`

const InputArea = styled(Box)`
  display: flex;
  padding: 12px;
  border-top: 1px solid #ddd;
  background-color: #fff;
`

const InputReqMsg = ["시 또는 도", "군 또는 시", "동"]

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      fromUser: true,
      text: "안녕하세요! 화장실 위치를 알려줄게요",
    },
    {
      fromUser: false,
      text: "시 또는 도를 입력하세요!!",
    },
  ])
  const [input, setInput] = useState("")
  const [inputMsg, SetInputMsg] = useState("")
  const [count, setCount] = useState(0)

  const handleSend = () => {
    const newMessages = [
      ...messages,
      {
        fromUser: true,
        text: `${input.trim()}을 입력하셨습니다.`,
      },
    ]
    debugger
    setMessages(newMessages)

    const newMsg = [...inputMsg, ` ${input.trim()}`]
    SetInputMsg(newMsg)
    setInput("")
  }

  const handleRecive = (result) => {
    debugger
    if (count >= 3) {
      const newMessages = [
        ...messages,
        {
          fromUser: true,
          text: `${result.input}에는 화장실이  ${Number(
            result.stat
          )} 개 있습니다.`,
        },
      ]
      setCount(0)
      setMessages(newMessages)
    } else {
      const newMessages = [
        ...messages,
        {
          fromUser: true,
          text: `${result.inputMsg}에는 ${InputReqMsg[count]}가  ${Number(
            result.stat
          )} 개 있습니다.`,
        },
      ]
      setMessages(newMessages)
    }
  }

  const chatbotMsg = () => {
    return new Promise(async (resolve) => {
      handleSend()
      try {
        debugger
        const result = await api("/chatbot", {
          stat: Math.floor(Math.random() * 10),
          input: `${input}`,
          text: `${inputMsg}`,
        })
        const { resMsg } = result
        handleRecive(resMsg)
        console.log("chatbot:", result)

        setCount(Number(count + 1))
        // Reset form on success
        resolve(!formState)
      } catch (error) {
        console.log("chatbot failed:", error)
        // Optionally return previous form state to preserve user input
        resolve(!formState)
      }
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      chatbotMsg()
    }
  }

  return (
    <ChatContainer elevation={3}>
      <MessagesContainer>
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} fromUser={msg.fromUser}>
            <Typography variant="body1">{msg.text}</Typography>
          </MessageBubble>
        ))}
      </MessagesContainer>

      <InputArea>
        <TextField
          variant="outlined"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
          size="small"
        />
        <IconButton color="primary" onClick={chatbotMsg}>
          <SendIcon />
        </IconButton>
      </InputArea>
    </ChatContainer>
  )
}
