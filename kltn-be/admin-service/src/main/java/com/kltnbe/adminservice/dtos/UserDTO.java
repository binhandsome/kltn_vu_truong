package com.kltnbe.adminservice.dtos;


import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {
    private Long userId;
    private String email;
    private String username;
    private String profilePicture;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String gender;
    private String userAddress;
    private Boolean isBanned;
    private Boolean isActive;
    private Date dateOfBirth;

    public UserDTO() {
    }

    public UserDTO(Long userId, String email, String username, String profilePicture) {
        this.profilePicture = profilePicture;
        this.email = email;
        this.userId = userId;
        this.username = username;
    }

    public UserDTO(Date dateOfBirth, String email, String firstName, String gender, Boolean isActive, Boolean isBanned, String lastName, String phoneNumber, String profilePicture, String userAddress, Long userId, String username) {
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.firstName = firstName;
        this.gender = gender;
        this.isActive = isActive;
        this.isBanned = isBanned;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.profilePicture = profilePicture;
        this.userAddress = userAddress;
        this.userId = userId;
        this.username = username;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public Boolean getBanned() {
        return isBanned;
    }

    public void setBanned(Boolean banned) {
        isBanned = banned;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getUserAddress() {
        return userAddress;
    }

    public void setUserAddress(String userAddress) {
        this.userAddress = userAddress;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
}
