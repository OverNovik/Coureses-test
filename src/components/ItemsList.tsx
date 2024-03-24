import React, { useState, useEffect, memo } from "react";
import Item, { ItemProps } from "./Item";
import "./style.scss";

const ItemsList: React.FC = () => {
  const [courses, setCourses] = useState<ItemProps[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");

  console.log(courses);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("https://logiclike.com/docs/courses.json");
      const data = await response.json();
      setCourses(data);
      setTags(
        Array.from(
          new Set(data.map((course: { tags: string }) => course.tags).flat())
        )
      );
    };
    fetchCourses();
  }, []);

  const filterCourses = () => {
    return selectedTag
      ? courses.filter((course) => course.tags.includes(selectedTag))
      : courses;
  };

  return (
    <div className="container">
      <div>
        <ul className="themes">
          <li
            className={selectedTag === "" ? "tag selected" : "tag"}
            onClick={() => setSelectedTag("")}
          >
            Все темы
          </li>
          {tags.map((tag, index) => (
            <li
              className={selectedTag === tag ? "tag selected" : "tag"}
              key={`option-${index}`}
              value={tag}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="list">
        {filterCourses().map((course) => (
          <Item
            key={course.id}
            name={course.name}
            image={course.image}
            tags={course.tags}
            bgColor={course.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(ItemsList);
