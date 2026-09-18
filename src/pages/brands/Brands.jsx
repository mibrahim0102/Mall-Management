
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminLayout from '../../components/layout/AdminLayout'

import {
  addBrand,
  updateBrand,
  deleteBrand,
} from '../../redux/slices/brandSlice'

function Brands() {
  const dispatch = useDispatch()

  const brands = useSelector(
    (state) => state.brands.brands
  )

  const [name, setName] = useState('')
  const [owner, setOwner] = useState('')
  const [contact, setContact] = useState('')

  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [editId, setEditId] = useState(null)

  // add or update brand
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !owner || !contact) {
      setError('please fill all fields')
      return
    }

    setError('')

    if (editId) {
      dispatch(
        updateBrand({
          id: editId,
          name,
          owner,
          contact,
        })
      )

      setEditId(null)
    } else {
      const nextBrandId =
        brands.reduce(
          (highestId, brand) =>
            Math.max(highestId, Number(brand.id) || 0),
          0
        ) + 1

      dispatch(
        addBrand({
          id: nextBrandId,
          name,
          owner,
          contact,
        })
      )
    }

    setName('')
    setOwner('')
    setContact('')
  }

  // edit brand
  const handleEdit = (brand) => {
    setEditId(brand.id)
    setName(brand.name)
    setOwner(brand.owner)
    setContact(brand.contact)
    setError('')
  }

  // delete brand
  const handleDelete = (id) => {
    dispatch(deleteBrand(id))
  }

  // cancel edit
  const handleCancel = () => {
    setEditId(null)
    setName('')
    setOwner('')
    setContact('')
    setError('')
  }

  // search brands
  const filteredBrands = brands.filter((brand) =>
    brand.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <AdminLayout>

      <div className="mb-4">
        <h2>Brands</h2>

        <p className="text-muted">
          Manage Mall Brands
        </p>
      </div>

      {/* add or edit form */}

      <div className="card mb-4">

        <div className="card-body">

          <h5 className="mb-3">
            {editId ? 'Edit Brand' : 'Add Brand'}
          </h5>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Brand Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Brand Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Owner Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Owner Name"
                  value={owner}
                  onChange={(e) =>
                    setOwner(e.target.value)
                  }
                />

              </div>

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Contact
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Contact"
                  value={contact}
                  onChange={(e) =>
                    setContact(e.target.value)
                  }
                />

              </div>

            </div>

            <button
              type="submit"
              className="btn btn-primary me-2"
            >
              {editId ? 'update brand' : 'Add Brand'}
            </button>

            {editId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}

          </form>

        </div>

      </div>

      {/* search */}

      <div className="card mb-4">

        <div className="card-body">

          <label className="form-label">
            Search Brands
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Search By Brand Name"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* brand table */}

      <div className="card">

        <div className="card-body">

          <h5 className="mb-3">
            Brand List
          </h5>

          <div className="table-responsive">

            <table className="table table-hover">

              <thead>

                <tr>
                  <th>Id</th>
                  <th>Brand Name</th>
                  <th>Owner</th>
                  <th>Contact</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {filteredBrands.length > 0 ? (
                  filteredBrands.map((brand) => (
                    <tr key={brand.id}>

                      <td>{brand.id}</td>

                      <td>{brand.name}</td>

                      <td>{brand.owner}</td>

                      <td>{brand.contact}</td>

                      <td>

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            handleEdit(brand)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(brand.id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-muted"
                    >
                      No Brands Found
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </AdminLayout>
  )
}

export default Brands
