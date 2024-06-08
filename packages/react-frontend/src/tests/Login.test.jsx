import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../pages/Login";

describe("Login Component", () => {
    beforeEach(() => {
        render(<Login />);
    });

    test("renders username input field", () => {
        const usernameInput = screen.getByLabelText("Username");
        expect(usernameInput).toBeInTheDocument();
    });

    test("renders password input field", () => {
        const passwordInput = screen.getByLabelText("Password");
        expect(passwordInput).toBeInTheDocument();
    });

    test("renders login button", () => {
        const loginButton = screen.getByText("Login");
        expect(loginButton).toBeInTheDocument();
    });

    test("renders create account button", () => {
        const createAccountButton = screen.getByText("Create Account");
        expect(createAccountButton).toBeInTheDocument();
    });
});
