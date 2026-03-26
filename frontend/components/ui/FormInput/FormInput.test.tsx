import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormInput from "./FormInput";

describe("Donat el component FormInput", () => {
  describe("Quan es renderitza amb un placeholder", () => {
    test("Ha de mostrar l'input amb el placeholder", () => {
      render(<FormInput placeholder="Correu electrònic" />);
      const input = screen.getByPlaceholderText("Correu electrònic");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Quan l'usuari escriu text", () => {
    test("Ha de cridar onChange amb el valor introduït", async () => {
      const handleChange = vi.fn();
      render(<FormInput placeholder="Correu" onChange={handleChange} />);

      const input = screen.getByPlaceholderText("Correu");
      await userEvent.type(input, "test@example.com");

      expect(handleChange).toHaveBeenCalled();
      expect(input).toHaveValue("test@example.com");
    });
  });

  describe("Quan es passa un type", () => {
    test("Ha de renderitzar l'input amb el type correcte", () => {
      render(<FormInput type="password" placeholder="Contrasenya" />);
      const input = screen.getByPlaceholderText("Contrasenya");
      expect(input).toHaveAttribute("type", "password");
    });
  });

  describe("Quan es passa una className addicional", () => {
    test("Ha de combinar-la amb les classes per defecte", () => {
      render(<FormInput placeholder="Test" className="extra-class" />);
      const input = screen.getByPlaceholderText("Test");
      expect(input).toHaveClass("extra-class");
      expect(input).toHaveClass("rounded-lg");
    });
  });
});
