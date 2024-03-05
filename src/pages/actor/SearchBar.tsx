import { Button, Input } from "antd";
import React, { useState } from "react";
import { ISearchActor } from "../../utils/type";

interface IProps {
  search: ISearchActor;
  setSearch: React.Dispatch<React.SetStateAction<ISearchActor>>;
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
        placeholder="Nhập tên diễn viên"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onPressEnter={handleSearch}
        allowClear
      />
      <Button type="primary" onClick={handleSearch}>
        Tìm kiếm
      </Button>
    </div>
  );
};

export default SearchBar;
