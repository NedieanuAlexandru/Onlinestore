package com.sda.onlinestore.dto;

import com.sda.onlinestore.model.RoleModel;

public class UserAccountDto {
    private Long id;
    private String username;
    private String password;
    private String city;
    private UserAddressDto userAdress;
    private UserAddressDto deliveryAdress;
    private String logotype;
    private RoleModel roletype;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public UserAddressDto getDeliveryAdress() {
        return deliveryAdress;
    }

    public void setDeliveryAdress(UserAddressDto deliveryAdress) {
        this.deliveryAdress = deliveryAdress;
    }

    public UserAddressDto getUserAdress() {
        return userAdress;
    }

    public void setUserAdress(UserAddressDto userAdress) {
        this.userAdress = userAdress;
    }

    public String getLogotype() {
        return logotype;
    }

    public void setLogotype(String logotype) {
        this.logotype = logotype;
    }

    public RoleModel getRoletype() {
        return roletype;
    }

    public void setRoletype(RoleModel roletype) {
        this.roletype = roletype;
    }
}
