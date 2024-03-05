import { Button, Col, Input, Row, Select } from "antd";
import React, { useState } from "react";
import { IOption, ISearchMovie } from "../../utils/type";
import {
  optionLanguageSearch,
  optionScore,
  optionType,
  optionYear,
} from "../../utils/constant";

interface IProps {
  search: ISearchMovie;
  setSearch: React.Dispatch<React.SetStateAction<ISearchMovie>>;
  setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  listGenres: Array<IOption>;
}
const SearchBar = (props: IProps) => {
  const { search, setSearch, setIsRefetch, listGenres } = props;

  const [input, setInput] = useState(search.name);

  const handleSearch = () => {
    setSearch((pre) => ({ ...pre, name: input }));
    setIsRefetch((pre) => !pre);
  };

  return (
    <div className="search-bar">
      <Row>
        <Col span={12} className="search-bar__name" offset={12}>
          <Input
            className="search-bar__name__input"
            placeholder="Nhập tên phim"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={handleSearch}
            allowClear
          />
          <Button type="primary" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </Col>

        <Col span={24} className="search-bar__filter">
          <Row gutter={[24, 24]} justify="end">
            <Col span={4} className="search-bar__filter__item">
              <div className="search-bar__filter__item__label">Kiểu phim:</div>

              <Select
                className="search-bar__filter__item__input"
                placeholder="Chọn kiểu phim"
                options={optionType}
                value={search.type}
                onChange={(e) => {
                  if (e) {
                    setSearch((pre) => ({ ...pre, type: e }));
                  } else {
                    setSearch((pre) => ({ ...pre, type: null }));
                  }
                }}
                allowClear
              />
            </Col>

            <Col span={4} className="search-bar__filter__item">
              <div className="search-bar__filter__item__label">Thể loại:</div>

              <Select
                className="search-bar__filter__item__input"
                placeholder="Chọn thể loại"
                options={listGenres}
                value={search.genreId}
                onChange={(e) => {
                  if (e) {
                    setSearch((pre) => ({ ...pre, genreId: e }));
                  } else {
                    setSearch((pre) => ({ ...pre, genreId: null }));
                  }
                }}
                allowClear
              />
            </Col>

            <Col span={4} className="search-bar__filter__item">
              <div className="search-bar__filter__item__label">Đánh giá:</div>

              <Select
                className="search-bar__filter__item__input"
                placeholder="Chọn đánh giá"
                options={optionScore}
                value={search.score}
                onChange={(e) => {
                  if (e) {
                    setSearch((pre) => ({ ...pre, score: e }));
                  } else {
                    setSearch((pre) => ({ ...pre, score: null }));
                  }
                }}
                allowClear
              />
            </Col>

            <Col span={4} className="search-bar__filter__item">
              <div className="search-bar__filter__item__label">Năm:</div>

              <Select
                className="search-bar__filter__item__input"
                placeholder="Chọn năm"
                options={optionYear}
                value={search.releaseDate}
                onChange={(e) => {
                  if (e) {
                    setSearch((pre) => ({ ...pre, releaseDate: e }));
                  } else {
                    setSearch((pre) => ({ ...pre, releaseDate: null }));
                  }
                }}
                allowClear
              />
            </Col>

            <Col span={4} className="search-bar__filter__item">
              <div className="search-bar__filter__item__label">Ngôn ngữ:</div>

              <Select
                className="search-bar__filter__item__input"
                placeholder="Chọn ngôn ngữ"
                options={optionLanguageSearch}
                value={search.language}
                onChange={(e) => {
                  if (e) {
                    setSearch((pre) => ({ ...pre, language: e }));
                  } else {
                    setSearch((pre) => ({ ...pre, language: null }));
                  }
                }}
                allowClear
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SearchBar;
