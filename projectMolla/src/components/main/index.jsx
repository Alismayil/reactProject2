import React, { useEffect, useState } from 'react'
import './main.scss'
import { Slider } from 'antd';
import { LiaBinocularsSolid } from "react-icons/lia";
import { MdAddShoppingCart } from "react-icons/md";



function Main() {

  const [sort, setSort] = useState("All")
  const [filtercatagory, setFiltercatagory] = useState("All")
  const [filtersize, setFilterSize] = useState("All")
  const [filtercolor, setFilterColor] = useState("All")
  const [filterbrand, setFilterBrand] = useState("All")
  const [grid, setGrid] = useState(3)
  const [cards, setCards] = useState([])
  const [isopen, setIsopen] = useState(false)
  const [isopenSize, setIsopenSize] = useState(false)
  const [isopenBrand, setIsopenBrand] = useState(false)
  const [isopenPrice, setIsopenPrice] = useState(false)
  const [isopenColour, setIsopenColour] = useState(false)
  const [filterData, setfilterData] = useState([])
  const [sizeData, setsizeData] = useState([])
  const [colorData, setcolorData] = useState([])
  const [brandData, setbrandData] = useState([])
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 120]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagePerData] = useState(8);
  const [pagePerDataTwo] = useState(4);

  const baseUrl = 'http://localhost:3000/product'

  // -----------MainSort------------

  function sortGridTwo(e) {
    e.preventDefault()
    setGrid(2)
  }
  function sortGridThree(e) {
    e.preventDefault()
    setGrid(3)
  }
  function sortGridFour(e) {
    e.preventDefault()
    setGrid(4)  
  }
  
  // -----------------pagination--------------------
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(cards.length / pagePerData); i++) {
    pageNumbers.push(i);
  }

  const lastElementIndex = currentPage * pagePerData;
  const firstElementIndex = lastElementIndex - pagePerData;

  const PageDatas = React.useMemo(() => cards.slice(firstElementIndex, lastElementIndex), [
    cards,
    currentPage,
  ]);

  // -----------SortSection-------------

    const handleSortSelect = (e) => (
      setSort(e.target.value)
    )

  // -----------------filtercatagory------------------
  
  const handleCategoryFilter = async (e) => {
    const selectedValue = e.target.value;
  
    if (!filterData.includes(selectedValue)) {
      setfilterData([...filterData, selectedValue]);
      setFiltercatagory(selectedValue);
    } else {
      const updatedFilterData = filterData.filter((x) => x !== selectedValue);
      setfilterData(updatedFilterData);
  
      if (updatedFilterData.length === 0) {
        setFiltercatagory("All");
      } else {
        setFiltercatagory(updatedFilterData[updatedFilterData.length - 1]);
      }
    }
  };
    
  const handlSizeFilter = async (e) => {
    const selectedSizeValue = e.target.value;
  
    if (!sizeData.includes(selectedSizeValue)) {
      setsizeData([...sizeData, selectedSizeValue]);
      setFilterSize(selectedSizeValue);
    } else {
      const updatedSizeData = sizeData.filter((x) => x !== selectedSizeValue);
      setsizeData(updatedSizeData);
  
      if (updatedSizeData.length === 0) {
        setFilterSize("All");
      } else {
        setFilterSize(updatedSizeData[updatedSizeData.length - 1]);
      }
    }
  };

  const handleColorFilter = async (e) => {
    const selectedColorValue = e.target.value;
  
    if (!colorData.includes(selectedColorValue)) {
      setcolorData([...colorData, selectedColorValue]);
      setFilterColor(selectedColorValue);
    } else {
      const updatedColorData = colorData.filter((x) => x !== selectedColorValue);
      setcolorData(updatedColorData);
  
      if (updatedColorData.length === 0) {
        setFilterColor("All");
      } else {
        setFilterColor(updatedColorData[updatedColorData.length - 1]);
      }
    }
  };
  
  const handlBrandFilter = async (e) => {
    const selectedBrandValue = e.target.value;
  
    if (!brandData.includes(selectedBrandValue)) {
      setbrandData([...brandData, selectedBrandValue]);
      setFilterBrand(selectedBrandValue);
    } else {
      const updatedBrandData = brandData.filter((x) => x !== selectedBrandValue);
      setbrandData(updatedBrandData);
  
      if (updatedBrandData.length === 0) {
        setFilterBrand("All");
      } else {
        setFilterBrand(updatedBrandData[updatedBrandData.length - 1]);
      }
    }
  };

  // ----------------Price Text-------------------------
  const handlePriceChange = (value) => {
    setPriceRange(value);
    setSelectedPriceRange(value);
    
  };



  // ----------------open---------------------
  const handleOpen = (e) => {
    setIsopen(!isopen)
  }
  const handleOpenSize = (e) => {
    setIsopenSize(!isopenSize)
  }
  const handleOpenBrand = (e) => {
    setIsopenBrand(!isopenBrand)
  }
  const handleOpenPrice = (e) => {
    setIsopenPrice(!isopenPrice)
  }
  const handleOpenColour = (e) => {
    setIsopenColour(!isopenColour)
  }
  

  // ------------------clear------------------------

    function handleClearAll() {
      setFiltercatagory("All");
      setFilterSize("All");
      setFilterColor("All");
      setFilterBrand("All");
    }

  // ---------------fetchCards--------------------
  const fetchData = async () => {
    try {
      const res = await fetch(`${baseUrl}`)
      const jsonData = await res.json()
      setCards(jsonData)
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    fetchData()
  }, [])

  return (
    <section id='mainSection'>
      <div className='mainUpBox'>
        <div className='filterText'>
          <div className='filterWord'>
            <p>Filters:</p>
          </div>
          <div className='cleanWord'>
            <p onClick={()=>handleClearAll()}>Clean All</p>
          </div>
        </div>
        <div className='productAndSort'>
          <div className='productBox'>
            <p>Showing <span> {cards.length} of 56 </span> Products</p>
          </div>
          <div className='sortBox'>
            <div className='sortWord'>
              <p>Sort by:</p>
            </div>
            <div className='sortFilter'>
              <select className='sortSection' value={sort} onChange={handleSortSelect}>
                <option value="1">Most Popular</option>
                <option value="2">Most Rated</option>
                <option value="All">All</option>
              </select>

            </div>
            <div className='catagorys'>
              <button>
                <a href="category-list.html" class="btn-layout">
                  <svg width="16" height="10">
                    <rect x="0" y="0" width="4" height="4"></rect>
                    <rect x="6" y="0" width="10" height="4"></rect>
                    <rect x="0" y="6" width="4" height="4"></rect>
                    <rect x="6" y="6" width="10" height="4"></rect>
                  </svg>
                </a>
              </button>
              <button onClick={sortGridTwo}>
                <a href="category-2cols.html" class="btn-layout">
                  <svg width="10" height="10">
                    <rect x="0" y="0" width="4" height="4"></rect>
                    <rect x="6" y="0" width="4" height="4"></rect>
                    <rect x="0" y="6" width="4" height="4"></rect>
                    <rect x="6" y="6" width="4" height="4"></rect>
                  </svg>
                </a>
              </button>
              <button onClick={sortGridThree}>
                <a href="category.html" class="btn-layout active">
                  <svg width="16" height="10">
                    <rect x="0" y="0" width="4" height="4"></rect>
                    <rect x="6" y="0" width="4" height="4"></rect>
                    <rect x="12" y="0" width="4" height="4"></rect>
                    <rect x="0" y="6" width="4" height="4"></rect>
                    <rect x="6" y="6" width="4" height="4"></rect>
                    <rect x="12" y="6" width="4" height="4"></rect>
                  </svg>
                </a>
              </button>
              <button onClick={sortGridFour}>
                <a href="category-4cols.html" class="btn-layout">
                  <svg width="22" height="10">
                    <rect x="0" y="0" width="4" height="4"></rect>
                    <rect x="6" y="0" width="4" height="4"></rect>
                    <rect x="12" y="0" width="4" height="4"></rect>
                    <rect x="18" y="0" width="4" height="4"></rect>
                    <rect x="0" y="6" width="4" height="4"></rect>
                    <rect x="6" y="6" width="4" height="4"></rect>
                    <rect x="12" y="6" width="4" height="4"></rect>
                    <rect x="18" y="6" width="4" height="4"></rect>
                  </svg>
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='mainDownBox'>
        <div className='mainLeftBox'>
          <div className='accordion'>
            <li className='accordion_box'>
              <li >
                <div className='arrowClickedBtn' onClick={(e) => handleOpen(e)}>
                  <h2 >Category</h2>
                  <i class={`fa-solid ${isopen ? "fa-chevron-up" :  "fa-chevron-down"}`}></i>
                </div>
                <li className={`categoryBox ${isopen ? 'open' : ""}`}>
                  <li>
                    <input type="checkbox"   onClick={(e)=>handleCategoryFilter(e)}  value={'Dresses'}  />
                    <p>Dresses</p>
                  </li>
                  <li>
                    <input type="checkbox"  onClick={(e)=>handleCategoryFilter(e)} value={'T-shirts'}  />
                    <p>T-shirts</p>
                  </li>
                  <li>
                    <input type="checkbox"  onClick={(e)=>handleCategoryFilter(e)} value={'Bags'} />
                    <p>Bags</p>
                  </li>
                  <li>
                    <input type="checkbox" onClick={(e)=>handleCategoryFilter(e)} value={'Jackets'} />
                    <p>Jackets</p>
                  </li>
                  <li>
                    <input type="checkbox"  onClick={(e)=>handleCategoryFilter(e)} value={'Shoes'} />
                    <p>Shoes</p>
                  </li>
                  <li>
                    <input type="checkbox"  onClick={(e)=>handleCategoryFilter(e)} value={'Jumpers'} />
                    <p>Jumpers</p>
                  </li>
                  <li>
                    <input type="checkbox"  onClick={(e)=>handleCategoryFilter(e)} value={'Jeans'} />
                    <p>Jeans</p>
                  </li>
                  <li>
                    <input type="checkbox"  onClick={(e)=>handleCategoryFilter(e)} value={'Sportwear'} />
                    <p>Sportwear</p>
                  </li>
                </li>
              </li>
              <li>
                <div className='arrowClickedBtn' onClick={(e) => handleOpenSize(e)}>
                  <h2 >Size</h2>
                  <i class={`fa-solid ${isopenSize ? "fa-chevron-up" :  "fa-chevron-down"}`}></i>
                </div>
                <li className={`categoryBox ${isopenSize ? 'open' : ""}`}>
                  <li>
                    <input type="checkbox"  onClick={(e)=>handlSizeFilter(e)} value={'Xs'} />
                    <p>XS</p>
                  </li>
                  <li>
                    <input type="checkbox"  onClick={(e)=>handlSizeFilter(e)} value={'S'} />
                    <p>S</p>
                  </li>
                  <li>
                    <input type="checkbox"  onClick={(e)=>handlSizeFilter(e)} value={'M'} />
                    <p>M</p>
                  </li>
                  <li>
                    <input type="checkbox"  onClick={(e)=>handlSizeFilter(e)} value={'L'} />
                    <p>L</p>
                  </li>
                  <li>
                    <input type="checkbox"  onClick={(e)=>handlSizeFilter(e)} value={'Xl'} />
                    <p>XL</p>
                  </li>
                  <li>
                    <input type="checkbox"  onClick={(e)=>handlSizeFilter(e)} value={'Xxl'} />
                    <p>XXL</p>
                  </li>
                </li>
              </li>
              <li>
                <div className='arrowClickedBtn' onClick={(e) => handleOpenColour(e)}>
                  <h2 >Colour</h2>
                  <i class={`fa-solid ${isopenColour ? "fa-chevron-up" :  "fa-chevron-down"}`}></i>
                </div>
                <li className={`categoryBox ${isopenColour ? 'open' : ""}`}>
                  <li className='checkboxss'>
                    <input type="checkbox"  onClick={(e)=>handleColorFilter(e)}  value={'Brown'} className='brown'  />
                    <input type="checkbox"  onClick={(e)=>handleColorFilter(e)}  value={'Yellow'} className='yellow' />
                    <input type="checkbox"  onClick={(e)=>handleColorFilter(e)}  value={'Black'} className='black' />
                    <input type="checkbox"  onClick={(e)=>handleColorFilter(e)}  value={'Red'} className='red' />
                    <input type="checkbox"  onClick={(e)=>handleColorFilter(e)}  value={'Blue'} className='blue' />
                    <input type="checkbox"  onClick={(e)=>handleColorFilter(e)}  value={'Green'} className='green' />
                    <input type="checkbox"  onClick={(e)=>handleColorFilter(e)}  value={'Pink'} className='pink' />
                    <input type="checkbox"  onClick={(e)=>handleColorFilter(e)}  value={'White'} className='white' />
                  </li>
                </li>
              </li>
              <li>
                <div className='arrowClickedBtn' onClick={(e) => handleOpenBrand(e)}>
                  <h2 >Brand</h2>
                  <i class={`fa-solid ${isopenBrand ? "fa-chevron-up" :  "fa-chevron-down"}`}></i>
                </div>
                <li className={`categoryBox ${isopenBrand ? 'open' : ""}`}>
                  <li>
                    <input type="checkbox" onClick={(e)=>handlBrandFilter(e)} value={'Next'} />
                    <p>Next</p>
                  </li>
                  <li>
                    <input type="checkbox" onClick={(e)=>handlBrandFilter(e)} value={'River Island'} />
                    <p>River Island</p>
                  </li>
                  <li>
                    <input type="checkbox" onClick={(e)=>handlBrandFilter(e)} value={'Geox'} />
                    <p>Geox</p>
                  </li>
                  <li>
                    <input type="checkbox" onClick={(e)=>handlBrandFilter(e)} value={'New Balance'} />
                    <p>New Balance</p>
                  </li>
                  <li>
                    <input type="checkbox" onClick={(e)=>handlBrandFilter(e)} value={'UGG'} />
                    <p>UGG</p>
                  </li>
                  <li>
                    <input type="checkbox" onClick={(e)=>handlBrandFilter(e)} value={'F&F'} />
                    <p>F&F</p>
                  </li>
                  <li>
                    <input type="checkbox" onClick={(e)=>handlBrandFilter(e)} value={'Nike'} />
                    <p>Nike</p>
                  </li>
                </li>
              </li>
              <li>
              <div className='arrowClickedBtn' onClick={(e) => handleOpenPrice(e)}>
                  <h2>Price</h2>
                  <i class={`fa-solid ${isopenPrice ? "fa-chevron-up" :  "fa-chevron-down"}`}></i>
                </div>
                <div className={`categoryBox ${isopenPrice ? 'open' : ""}`}>
                  <div className='priceBox'>
                  <p className='rangeBox'>Selected Price Range: <p className='priceText'> ${priceRange[0]} - ${priceRange[1]} </p></p>
                <Slider className='slider'  range={{ }}
                  defaultValue={[0, 70]}
                  min={0.00}
                  max={200}
                  onChange={handlePriceChange}
                  railStyle={{ backgroundColor: '#b6a6a6' }}
                  trackStyle={[{ backgroundColor: 'black' }]}
                />
                  </div>
                </div>
              </li>
              <li>
              </li>
            </li>
          </div>
        </div>
        <div className='mainRightBox'>
          <div className='cardsBox' style={{ gridTemplateColumns: `repeat(${grid}, 1fr)` }}>  
            {
              PageDatas &&  PageDatas.filter((item) => item.price >= selectedPriceRange[0] && item.price <= selectedPriceRange[1])
              .filter((item) => filterbrand === "All" || brandData.includes(item.brand))
              .filter((item) => filtersize === "All" || sizeData.includes(item.size))
              .filter((item) => filtercolor === "All" || colorData.includes(item.color))
              .filter((item) => filtercatagory === "All" || filterData.includes(item.category))
              .filter((item) => sort === "All" || item.sortId === parseFloat(sort)).map((item) => (
                <div key={item.id} className='card'>
                  
                  <>
                  
                    <div className='cardImg'>
                      <div className='cardHover'>
                        <div className='cardHoverUp'>
                          <div className='HoverBtns'>
                            
                            <div className='wishlistBtn'>
                              <div className='wishlistBackBox'>
                                <p>Add to wishlist</p>
                              </div>
                              <i class="fa-regular fa-heart"></i>
                              </div>
                            <div className='otherBtn'>
                            <LiaBinocularsSolid />
                            </div>
                            <div className='otherBtn'>
                              <i class="fa-solid fa-code-compare"></i>
                            </div>
                          </div>
                        </div>
                        <div className='cardHoverDown'>
                        <MdAddShoppingCart />
                        <p>Add To Card</p>
                        </div>
                      </div>
                      <div className='status'>
                      {item.status && <p className={item.status === 'New' ? 'new' : item.status === 'Top' ? 'top' : 'stock'}>{item.status }</p>}
                      </div>
                      <img src={item.image} alt="" />
                    
                    </div>
                    <div className='cardText'>
                      <p className='category'>{item.category}</p>
                      <p className='name'>{item.name}</p>
                      <p className='price'>${item.price}</p>
                    </div>
                  </>
                  
                </div>
              ))
            }
            

          </div>
          <div>
        {pageNumbers.map((page) => (
          // <div className='paginationBtn'>
          <button className='chooseBtn' key={page} onClick={() => setCurrentPage(page)}>
            {page}
          </button>
          // </div>
          
        ))}
      </div>
        </div>
      </div>
    </section>
  )
}

export default Main
