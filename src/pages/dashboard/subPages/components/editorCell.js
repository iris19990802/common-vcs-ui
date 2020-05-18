import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';

export default function cell(props) {
  const { display, value, onChange } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(null);
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  return isEdit ? (
    <>
      <Input value={editValue} onChange={e => setEditValue(e.target.value)} />
      <SaveOutlined
        onClick={() => {
          setIsEdit(false);
          onChange(editValue);
        }}
      />
    </>
  ) : (
    <span>
      {display || value}
      <EditOutlined onClick={() => setIsEdit(true)} />
    </span>
  );
}
