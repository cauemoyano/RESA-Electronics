import React from "react";
import { AiOutlineShoppingCart, AiOutlineCloseCircle } from "react-icons/ai";
import { useGlobalContext } from "../context";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
const Cart = ({ style }) => {
  let {
    loggedIn,
    cart: { total, items },
    toggleModal,
    increaseAmount,
    decreaseAmount,
    removeItem,
    toggleCart,
    cartOpen,
  } = useGlobalContext();

  const checkLog = () => {
    if (loggedIn) {
      return (
        <Link to="/checkout" className={style.checkoutBtn}>
          Checkout
        </Link>
      );
    } else {
      return (
        <p>
          In order to checkout please
          <button className={style.loginBtn} onClick={toggleModal}>
            LOGIN
          </button>
        </p>
      );
    }
  };
  total = total.toFixed(2);
  const totalItems = items.reduce((acc, item) => {
    return (acc += +item.amount);
  }, 0);
  return (
    <>
      <div className={style.cartWrapper}>
        <button
          className={style.btnCart}
          onClick={toggleCart}
          aria-label="Cart"
        >
          <AiOutlineShoppingCart className={style.cart} />
        </button>
        <div className={style.cartAmount}>
          <p>{totalItems}</p>
        </div>
      </div>
      <div
        className={`${
          !cartOpen
            ? [style.cartContainer, style.hideCart].join(" ")
            : style.cartContainer
        }`}
      >
        <button
          className={style.closeBtn}
          onClick={toggleCart}
          aria-label="Close cart"
        >
          <AiOutlineCloseCircle />
        </button>
        <h4 className={style.cartTitle}>CART</h4>
        <div className={style.cartItemsWrapper}>
          {items.map((item) => {
            const { nameShort, price, amount, image, id, color } = item;
            return (
              <div className={style.cartItemWrapper} key={id}>
                <div className={style.cartImageWrapper}>
                  <img
                    className={style.cartImage}
                    src={`${process.env.PUBLIC_URL}/assets/products/${image}`}
                    alt={nameShort}
                  />
                </div>
                <article>
                  <h4>{nameShort}</h4>
                  <p>${price}</p>
                  <p
                    style={
                      color === "black"
                        ? {
                            color: `grey`,
                          }
                        : { color: `${color}` }
                    }
                  >
                    {color.toUpperCase()}
                  </p>
                  <button
                    onClick={() => {
                      removeItem(id);
                    }}
                    aria-label="remove item"
                  >
                    Remove
                  </button>
                </article>
                <div>
                  <button
                    onClick={() => {
                      increaseAmount(id, "cart");
                    }}
                    style={{ color: "#FFF" }}
                  >
                    <BiUpArrow />
                  </button>
                  <h4>{amount}</h4>
                  <button
                    style={{ color: "#FFF" }}
                    onClick={() => {
                      decreaseAmount(id, "cart");
                    }}
                  >
                    <BiDownArrow />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className={style.totalWrapper}>
          <header>
            <h4>Total</h4>
            <h4>
              $<span>{total}</span>
            </h4>
          </header>
          <div className={style.checkoutBtnWrapper}>{checkLog()}</div>
        </div>
      </div>
    </>
  );
};

export default Cart;
