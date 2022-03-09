package com.example.socketchatapp.config;

import com.example.socketchatapp.model.ChatMessage;
import com.example.socketchatapp.model.ChatType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mongo.embedded.EmbeddedMongoProperties;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

public class SocketAction {
    @Autowired
    private SimpMessageSendingOperations messagingTemplate ;
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        System.out.println(" I am connected");
    }@EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor= StompHeaderAccessor.wrap(event.getMessage());
        String userName =(String) headerAccessor.getSessionAttributes().get("user name ");
        if (userName != null){
            System.out.println("HI am not connected .... " + userName);
            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setChatType(ChatType.LEAVE);
            chatMessage.setSender(userName);

            messagingTemplate.convertAndSend("/topic/all",chatMessage);
        }
    }
}
