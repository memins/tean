import { render, screen } from "@testing-library/react";
import Navbar from "../src/components/navbar";

describe("Navbar component", () => {
  it("renders without crashing", () => {
    render(<Navbar />);
  });

  it("has a home link", () => {
    render(<Navbar />);
    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("has an about link", () => {
    render(<Navbar />);
    const aboutLink = screen.getByText("About");
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink.closest("a")).toHaveAttribute("href", "/about");
  });

  it("has a contact link", () => {
    render(<Navbar />);
    const contactLink = screen.getByText("Contact");
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.closest("a")).toHaveAttribute("href", "/contact");
  });
});
