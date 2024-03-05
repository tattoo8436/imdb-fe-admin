import { Button, Input } from "antd";
import React, { useState } from "react";
import { ISearchDirector } from "../../utils/type";

interface IProps {
  search: ISearchDirector;
  setSearch: React.Dispatch<React.SetStateAction<ISearchDirector>>;
  setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}
const SearchBar = (props: IProps) => {
  const { search, setSearch, setIsRefetch } = props;

  const [input, setInput] = useState(search.name);

  const handleSearch = () => {
    setSearch((pre) => ({ ...pre, name: input }));
    setIsRefetch((pre) => !pre);
  };

  return (
    <div className="search-bar">
      <Input
        className="search-bar__input"
        placeholder="Nhập tên đạo diễn"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onPressEnter={handleSearch}
      />
      <Button type="primary" onClick={handleSearch}>
        Tìm kiếm
      </Button>
    </div>
  );
};

export default SearchBar;
