import { Card, Select, Input, Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const optionsTag = [
  { value: "Tag1", label: "Hello" },
  { value: "Tag2", label: "Goodbye" },
  { value: "Tag3", label: "Morning" },
];

const optionsLastName = [
  { value: "firstname", label: "FIRSTNAME" },
  { value: "lastname", label: "LASTNAME" },
  { value: "name", label: "NAME" },
];

const optionsThat = [
  { value: "handsome", label: "handsome" },
  { value: "ugly", label: "ugly" },
  { value: "kind", label: "kind" },
];

const Lesson6 = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [lastName, setLastName] = useState<string | undefined>(undefined);
  const [that, setThat] = useState<string | undefined>(undefined);
  const [text, setText] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const tagsParam = searchParams.get("tags");
    const lastNameParam = searchParams.get("lastName");
    const thatParam = searchParams.get("that");
    const textParam = searchParams.get("text");
    if (tagsParam) setTags(tagsParam.split(","));
    if (lastNameParam) setLastName(lastNameParam);
    if (thatParam) setThat(thatParam);
    if (textParam) setText(textParam);
    if (tagsParam || lastNameParam || thatParam || textParam) {
      setResult({
        tags: tagsParam ? tagsParam.split(",") : [],
        lastName: lastNameParam,
        that: thatParam,
        text: textParam,
      });
    }
    // eslint-disable-next-line
  }, []);
  const handleFilter = () => {
    const newParams: Record<string, string> = {};
    if (tags.length) newParams.tags = tags.join(",");
    if (lastName) newParams.lastName = lastName;
    if (that) newParams.that = that;
    if (text) newParams.text = text;
    setSearchParams(newParams);
    setResult({ tags, lastName, that, text });
  };

  const handleClear = () => {
    setTags([]);
    setLastName(undefined);
    setThat(undefined);
    setText("");
    setResult(null);
    navigate("?");
  };

  return (
    <Card title="Filter">
      <div className="flex flex-col mb-4">
        <span className="mb-[12px]">Tag</span>
        <Select
          mode="multiple"
          showSearch
          placeholder="Tag"
          optionFilterProp="label"
          className="w-[200px]"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={optionsTag}
          value={tags}
          onChange={setTags}
        />
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <span className="my-[12px]">Show Only Records With</span>
          <Select
            showSearch
            placeholder="Lastname"
            optionFilterProp="label"
            className="w-[200px]"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={optionsLastName}
            value={lastName}
            onChange={setLastName}
          />
        </div>
        <div className="flex flex-col">
          <span className="my-[12px]">That</span>
          <Select
            showSearch
            placeholder="That"
            optionFilterProp="label"
            className="w-[200px]"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={optionsThat}
            value={that}
            onChange={setThat}
          />
        </div>
        <div className="flex flex-col">
          <span className="my-[12px]">Text</span>
          <Input
            placeholder="Text"
            className="w-[300px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <Button type="primary" onClick={handleFilter}>
          filter
        </Button>
        <Button onClick={handleClear} type="link">
          Clear
        </Button>
      </div>
      {result && (
        <Table
          dataSource={[
            {
              key: 1,
              filter: `LastName: ${result.lastName || ""}\nThat: ${
                result.that || ""
              }\nText: ${result.text || ""}`,
              tags: (result.tags || []).join(", "),
            },
          ]}
          columns={[
            {
              title: "Filter",
              dataIndex: "filter",
              key: "filter",
              render: (text: string) => <pre>{text}</pre>,
            },
            { title: "Tags", dataIndex: "tags", key: "tags" },
          ]}
          pagination={false}
        />
      )}
    </Card>
  );
};

export default Lesson6;