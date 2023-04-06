package com.jihoon.board.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jihoon.board.common.constant.ApiPattern;
import com.jihoon.board.dto.request.user.PatchProfileDto;
import com.jihoon.board.dto.request.user.ValidateEmailDto;
import com.jihoon.board.dto.request.user.ValidateNicknameDto;
import com.jihoon.board.dto.request.user.ValidateTelNumberDto;
import com.jihoon.board.dto.response.ResponseDto;
import com.jihoon.board.dto.response.user.GetUserResponseDto;
import com.jihoon.board.dto.response.user.PatchProfileResponseDto;
import com.jihoon.board.dto.response.user.ValidateEmailResponseDto;
import com.jihoon.board.dto.response.user.ValidateNicknameResponseDto;
import com.jihoon.board.dto.response.user.ValidateTelNumberResponseDto;
import com.jihoon.board.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.web.bind.annotation.RequestParam;

@Api(description = "유저 모듈")
@RestController
@RequestMapping(ApiPattern.USER)
public class UserController {

    @Autowired
    private UserService userService;

    private final String GET_USER = "/";
    private final String VALIDATE_EMAIL = "/vlidate/email";
    private final String VALIDATE_NICKNAME = "/vlidate/nickname";
    private final String VALIDATE_TELNUMBER = "/vlidate/tel-number";
    private final String PATCH_PROFILE = "/profile";

    @ApiOperation(value = "유저 정보 불러오기", notes = "Request Header Authorization에 Bearer Token을 포함하여 요청을 하면, 성공시 유저 정보를 반환, 실패시 실패 메세지를 반환")
    @GetMapping(GET_USER)
    public ResponseDto<GetUserResponseDto> getUser(@AuthenticationPrincipal String email) {
        ResponseDto<GetUserResponseDto> response = userService.getUser(email);
        return response;
    }

    @ApiOperation(value = "유저 이메일 중복 체크", notes = "Request Body에 Email을 포함하여 요청하면, 중복 결과를 반환, 실패시 실패 메세지를 반환")
    @PostMapping(VALIDATE_EMAIL)
    public ResponseDto<ValidateEmailResponseDto> validateEmail(
            @Valid @RequestBody ValidateEmailDto requestBody) {
        ResponseDto<ValidateEmailResponseDto> response = userService.validateEmail(requestBody);
        return response;
    }

    @ApiOperation(value = "유저 닉네임 중복 체크", notes = "Request Body에 Email을 포함하여 요청하면, 중복 결과를 반환, 실패시 실패 메세지를 반환")
    @PostMapping(VALIDATE_NICKNAME)
    public ResponseDto<ValidateNicknameResponseDto> validateNickname(
            @Valid @RequestBody ValidateNicknameDto requestBody) {
        ResponseDto<ValidateNicknameResponseDto> response = userService.validateNickname(requestBody);
        return response;
    }

    @ApiOperation(value = "유저 휴대전화번호 중복 체크", notes = "Request Body에 Email을 포함하여 요청하면, 중복 결과를 반환, 실패시 실패 메세지를 반환")
    @PostMapping(VALIDATE_TELNUMBER)
    public ResponseDto<ValidateTelNumberResponseDto> validateTelNumber(
            @Valid @RequestBody ValidateTelNumberDto requestBody) {
        ResponseDto<ValidateTelNumberResponseDto> response = userService.validateTelNumber(requestBody);
        return response;
    }

    @ApiOperation(value = "유저 프로필 URL 수정", notes = "Request Header Authorization에 Bearer JWT를 포함하고 Request Body에 profile을 포함하여 요청을 하면, 성공시 유저 정보를 반환, 실패시 실패 메세지를 반환")
    @PatchMapping(PATCH_PROFILE)
    public ResponseDto<PatchProfileResponseDto> patchProfile(
            @ApiParam(hidden = true) @AuthenticationPrincipal String email,
            @Valid @RequestBody PatchProfileDto requestBody) {
        ResponseDto<PatchProfileResponseDto> response = userService.patchProfile(email, requestBody);
        return response;
    }

}
