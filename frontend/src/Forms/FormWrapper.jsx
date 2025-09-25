import React, { useState } from "react"

const FormWrapper = ({ onGetPrd, onResetPrd, onChangeSearch}) => {
  const [search, setSearch] = useState("")
  const onChange = (e) => {
    const {currentTarget : {value},}=e;
    setSearch(value)
    onChangeSearch(value)
  }
  const onDeleteSearch = () => {
    setSearch("")
    onChangeSearch("")
  }
  return (
    <div className="form-wrapper">
      <form className="form-wrap">
        <input
          type="text"
          className="search-input"
          onChange={onChange}
          value={search}
          autoFocus
        />
        <span
          className={`fa fa-times btn-delete ${search ? "active" : ""}`}
          onClick={onDeleteSearch}
        ></span>
      </form>
      <button
        className="btn"
        onClick={() => {
          onGetPrd()
          setSearch("")
        }}
      >
        상품가져오기
      </button>
      <button
        className="btn"
        onClick={(e) => {
          onResetPrd(e)
          setSearch("")
        }}
      >
        상품지우기
      </button>
    </div>
  )
}

export default FormWrapper
