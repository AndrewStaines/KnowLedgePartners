import React, { useState } from 'react';

function AbstractItem({ item, onDownload, onApprove }) {
  const [rat, setRat] = useState('');
  const [dom, setDom] = useState('');

  return (
    <li key={item._id}>
      <p>{item.desc}</p>
      <button onClick={() => onDownload(item.abs.data, item.desc)}>Download File</button>
      <input
        type="text"
        value={rat}
        onChange={(e) => setRat(e.target.value)}
        placeholder="Your rating out of 10"
      />
      <input
        type="text"
        value={dom}
        onChange={(e) => setDom(e.target.value)}
        placeholder="Domain of the Paper"
      />
      <button className="b2" onClick={() => onApprove(rat, dom)}>Approve</button>
    </li>
  );
}

export default AbstractItem;
