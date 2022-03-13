package com.example.socketchatapp.Controller;

import com.example.socketchatapp.model.ActiveUser;
import com.example.socketchatapp.model.Storage;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @GetMapping("/active")
    public List<ActiveUser> list(){
        return Storage.activeUserList;

    }
}
