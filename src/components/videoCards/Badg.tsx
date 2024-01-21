"use client";
import React from "react";
import "./ribbon.css";
interface BadgProps {
  id: any;
}
// Functional Component
const Badg: React.FC<BadgProps> = ({ id }) => {
  return <>{id == 0 && <div className="absolute ribbon-2">Recomonded</div>}</>;
};
export default Badg;
