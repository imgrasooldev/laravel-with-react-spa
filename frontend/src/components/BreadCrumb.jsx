import React from "react";
import { Link, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

function BreadCrumb() {
  return (
    <>
      <header id="page-header">
        <h1>Blank Page</h1>
        <ol className="breadcrumb">
          <li>
            <a href="#">Pages</a>
          </li>
          <li className="active">Blank Page</li>
        </ol>
      </header>
    </>
  );
}

export default BreadCrumb;
