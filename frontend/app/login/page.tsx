"use client";

import { useState } from "react";
import FormInput from "@/components/ui/FormInput/FormInput";
import FormButton from "@/components/ui/FormButton/FormButton";
import AuthFormCard from "@/components/auth/AuthFormCard/AuthFormCard";
import { LOGIN_COPY } from "@/constants/copy/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: React.ComponentPropsWithoutRef<"form">["onSubmit"] = (
    e,
  ) => {
    e.preventDefault();
    // TODO: connectar amb l'API d'autenticació
  };

  return (
    <AuthFormCard
      title={LOGIN_COPY.title}
      switchPrompt={LOGIN_COPY.switchPrompt}
      switchLink={LOGIN_COPY.switchLink}
      switchHref={LOGIN_COPY.switchHref}
      onSubmit={handleSubmit}
    >
      <FormInput
        type="email"
        placeholder={LOGIN_COPY.fields.email}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        type="password"
        placeholder={LOGIN_COPY.fields.password}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormButton>{LOGIN_COPY.submit}</FormButton>
    </AuthFormCard>
  );
};

export default LoginPage;
