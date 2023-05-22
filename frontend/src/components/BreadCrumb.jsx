import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function BreadCrumb() {
    return (
        <>
            <header id="page-header">
                <h1>Blank Page</h1>
                <ol className="breadcrumb">
                    <li><a href="#">Pages</a></li>
                    <li className="active">Blank Page</li>
                </ol>
            </header></>
    )
    // const location = useLocation();

    /* return (
        <nav>
            <Link to="/"
                className={location.pathname === "/" ? "breadcrumb-active" : "breadcrumb-not-active"}
            >
                Home
            </Link>
            <Link to="/products"
                className={location.pathname.startsWith("/products") ? "breadcrumb-active" : "breadcrumb-not-active"}
            >
                Products
            </Link>
            <Link to="/products/1"
                className={location.pathname === "/products/1" ? "breadcrumb-active" : "breadcrumb-not-active"}
            >
                Product 1
            </Link>
        </nav>
    ); */
}

export default BreadCrumb