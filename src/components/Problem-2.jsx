import React, { useEffect, useState } from "react";
import "../assets/scss/modal.scss";

const Problem2 = () => {
  const [modal, setModal] = useState(null);
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={() => setModal("modal1")}
            className="btn btn-lg btn-outline-primary"
          >
            All Contacts
          </button>
          <button
            onClick={() => setModal("modal2")}
            className="btn btn-lg btn-outline-warning"
            type="button"
          >
            US Contacts
          </button>
        </div>
        {modal === "modal1" && (
          <Modal
            setModal={setModal}
            api={"https://contact.mediusware.com/api/contacts/"}
          />
        )}
        {modal === "modal2" && (
          <Modal
            setModal={setModal}
            api={
              "https://contact.mediusware.com/api/country-contacts/United States/"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Problem2;

const Modal = ({ setModal, api }) => {
  const [detailModal, setDetailModal] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    const modalContent = document.querySelector(".modal-content");
    modalContent.addEventListener("scroll", handleScroll);

    return () => {
      modalContent.removeEventListener("scroll", handleScroll);
    };
  }, [page, search]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const url = new URL(api);
      url.searchParams.append("page", page);
      url.searchParams.append("search", search);

      const response = await fetch(url.toString());
      const data = await response.json();

      if (data?.results && data.results[Symbol.iterator]) {
        setContacts((prevContacts) =>
          page === 1 ? data.results : [...prevContacts, ...data.results]
        );
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.searchTerm.value);
  };

  const handleScroll = () => {
    const modalContent = document.querySelector(".modal-content");
    if (
      modalContent.scrollTop + modalContent.clientHeight >=
        modalContent.scrollHeight - 10 &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="custom-modal">
      <div className="modal-body">
        <div className="modal-header d-flex justify-content-center flex-column-reverse align-items-center gap-4">
          <form onSubmit={handleSearch} className="input-group">
            <input
              type="text"
              id="searchTerm"
              className="form-control"
              placeholder="Search Contact"
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-center gap-2">
            <button
              onClick={() => setModal("modal1")}
              className="btn btn-primary"
              style={{
                backgroundColor: "#46139f",
                border: "2px solid #46139f",
              }}
            >
              All Contacts
            </button>
            <button
              onClick={() => setModal("modal2")}
              className="btn btn-primary"
              style={{
                backgroundColor: "#ff7f50",
                border: "2px solid #ff7f50",
              }}
            >
              US Contacts
            </button>
            <button
              className="btn btn-primary"
              style={{
                backgroundColor: "#fff",
                border: "2px solid #46139f",
                color: "#46139f",
              }}
              onClick={() => setModal(null)}
            >
              Close
            </button>
          </div>
        </div>
        <div className="modal-content">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Contact</th>
                <th>Country</th>
              </tr>
            </thead>
            {contacts?.length <= 0 ? (
              <div className="d-flex m-4">No data found!</div>
            ) : (
              <tbody>
                {contacts?.map((contact) => (
                  <tr
                    key={contact?.id}
                    onClick={() =>
                      setDetailModal({
                        id: contact?.id,
                        phone: contact?.phone,
                        country: contact?.country?.name,
                      })
                    }
                    style={{ cursor: "pointer" }}
                    className="table-hover"
                  >
                    <td>{contact?.id}</td>
                    <td>{contact?.phone}</td>
                    <td>{contact?.country?.name}</td>
                  </tr>
                ))}
                {loading && <span>Loading...</span>}
              </tbody>
            )}
          </table>
        </div>
        {detailModal && (
          <DetailModal data={detailModal} setModaldata={setDetailModal} />
        )}
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

const DetailModal = ({ data, setModaldata }) => {
  return (
    <div className="custom-modal">
      <div className="modal-body-small">
        <div className="modal-header d-flex justify-content-end">
          <button
            className="btn btn-primary"
            style={{
              backgroundColor: "#fff",
              border: "2px solid #46139f",
              color: "#46139f",
            }}
            onClick={() => setModaldata(null)}
          >
            Close
          </button>
        </div>
        <div className="modal-content">
          <span>
            <strong>Id</strong> : {data?.id}
          </span>
          <span>
            <strong>Phone</strong> : {data?.phone}
          </span>
          <span>
            <strong>Country</strong> : {data?.country}
          </span>
        </div>
      </div>
    </div>
  );
};
