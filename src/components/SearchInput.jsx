import styled from "styled-components";
import theme from "../styles/theme";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getSearchedProduct } from "../store/slices/searched-product-slice";
import { shownProductActions } from "../store/slices/shown-product-slice";

import { GoSearch } from "react-icons/go";

const mainColor = theme.palette.purple;

const SearchForm = styled.form`
  ${(props) => props.theme.common.flexCenter}
  width: 20rem;
  margin: 1rem auto;
  margin-bottom: 2rem;
`;

const SearchBar = styled.input`
  width: 85%;
  padding: 0.7rem;
  font-size: 18px;
  margin-right: 0.7rem;
  border: solid 2px ${mainColor};
  border-radius: 16px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const TitleArea = styled.div`
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 20rem;
  font-size: 18px;
`;

function SearchInput() {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState(null);

  const searchedProducts = useSelector((state) => {
    return state.searchedProduct.data;
  });

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(getSearchedProduct(inputValue));
    dispatch(shownProductActions.updateShownSearchedProduct(searchedProducts));
    dispatch(shownProductActions.changeIsSearched());
  };

  const inputValueHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <TitleArea>
        <h2>상품검색</h2>
      </TitleArea>
      <SearchForm onSubmit={searchHandler}>
        <SearchBar
          type="text"
          name="searchValue"
          placeholder="원하시는 상품을 검색하세요"
          onChange={inputValueHandler}
        />
        <button style={{ border: "none" }}>
          <GoSearch size="2rem" color="#6b23e0" cursor="pointer" />
        </button>
      </SearchForm>
    </div>
  );
}

export default SearchInput;
