"use client";
import { builder, Builder } from "@builder.io/react";
import ContentsManager from "./app/admin/contents/ContentsManager";
import Counter from "./components/Counter/Counter";
import DeveloppableSection from "./app/components/DeveloppableSection";
import Footer from "./app/components/Footer";
import Header from "./app/components/Header";
import ProjectCard from "./app/components/ProjectCard";
import ProjectsManager from "./app/admin/projects/ProjectsManager";
import RegisterForm from "./app/admin/register/RegisterForm";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(Counter, {
  name: "Counter",
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});

Builder.registerComponent(DeveloppableSection, {
  name: "DeveloppableSection",
  inputs: [
    {
      name: "content",
      type: "string",
      required: true,
    },
    {
      name: "defaultOpen",
      type: "boolean",
    },
    {
      name: "justify",
      type: "string",
    },
    {
      name: "title",
      type: "string",
      required: true,
    },
  ],
});

Builder.registerComponent(Footer, {
  name: "Footer",
});

Builder.registerComponent(Header, {
  name: "Header",
});

Builder.registerComponent(ProjectCard, {
  name: "ProjectCard",
  inputs: [
    {
      name: "description",
      type: "string",
      required: true,
    },
    {
      name: "imageUrl",
      type: "string",
      required: true,
    },
    {
      name: "projectUrl",
      type: "string",
      required: true,
    },
    {
      name: "technologies",
      type: "object",
      hideFromUI: true,
      meta: {
        ts: "string[]",
      },
      required: true,
    },
    {
      name: "title",
      type: "string",
      required: true,
    },
  ],
});

Builder.registerComponent(ProjectsManager, {
  name: "ProjectsManager",
  inputs: [
    {
      name: "initialProjects",
      type: "object",
      hideFromUI: true,
      meta: {
        ts: "Project[]",
      },
      required: true,
    },
  ],
});

Builder.registerComponent(ContentsManager, {
  name: "ContentsManager",
  inputs: [
    {
      name: "initialContents",
      type: "object",
      hideFromUI: true,
      meta: {
        ts: "MainPageRubrique[]",
      },
      required: true,
    },
  ],
});

Builder.registerComponent(RegisterForm, {
  name: "RegisterForm",
});

Builder.registerComponent(Builder, {
  name: "Builder",
});
