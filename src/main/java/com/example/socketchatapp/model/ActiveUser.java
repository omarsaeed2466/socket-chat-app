package com.example.socketchatapp.model;

public class ActiveUser {
    private String UserName ;
    private String Session ;

    public ActiveUser() {
    }

    public ActiveUser(String userName, String session) {
        UserName = userName;
        Session = session;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public String getSession() {
        return Session;
    }

    public void setSession(String session) {
        Session = session;
    }
}
