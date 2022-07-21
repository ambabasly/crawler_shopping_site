import React, { useState } from 'react'
import { Col, Form, Input, Modal, Row, Tag, Button } from 'antd'
import { chocolateData } from '../../data/chocolate-data'
import ChocolateItem from '../../components/chocolateitem/chocolateitem'
import Chart from '../../components/chart/chart'

const Homepage = () => {
  const [currentlyViewing, setCurrentlyViewing] = useState<any>(null)
  const [visible, setVisible] = useState(false)

  const getCheapestShopLink = (shopPrices: {
    price: number,
    shop: string,
    link: string,
    unit: string,
    amount: number
  }[]) => {
    if (shopPrices.length === 0) {
      return null
    } else {
      let min = shopPrices.reduce((prev, curr) => {
        return prev.price < curr.price ? prev : curr;
      });
      return min.link
    }
  }

  const reconstructChartData = (nurition: {
    fat: {
      total: number;
      saturated: number;
    };
    carbohydrates: {
      total: number;
      sugar: number;
    };
    protein: number;
    salt: number;
  }) => {
    let data = [
      {
        name: 'Fat',
        value: nurition.fat.total
      },
      {
        name: 'Carbohydrates',
        value: nurition.carbohydrates.total
      },
      {
        name: 'Protein',
        value: nurition.protein
      },
      {
        name: 'Salt',
        value: nurition.salt
      }
    ]

    return data
  }

  const openDisplayItem = (item: any) => {
    setCurrentlyViewing(item)
    setVisible(true)
  }

  const closeModal = () => {
    setVisible(false)
    setCurrentlyViewing(null)
  }

  const onFinish = (values: { name: string, brand: string }) => {
    alert('Updated')
  }

  return (
    <div className='homepage'>
      <div className="logo-holder">
        <h1>MARKT</h1>
        <h1>PILOT</h1>
      </div>

      <div className="data-holder">
        <Row gutter={16}>
          {
            chocolateData.data.map((item, index: number) => (
              <Col lg={8} md={8} xs={24} key={`choco-item-${item.id}-${index}`}>
                <ChocolateItem
                  name={item.name}
                  brand={item.brand}
                  cheapestShopLink={getCheapestShopLink(item.prices)}
                  openDisplay={() => {
                    openDisplayItem(item)
                  }}
                />
              </Col>
            ))
          }
        </Row>
      </div>

      {
        currentlyViewing !== null &&
        <Modal
          visible={visible}
          onCancel={closeModal}
          onOk={closeModal}
          footer={null}
          title={currentlyViewing.name}
          className="item-modal"
        >

          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              name: currentlyViewing.name,
              brand: currentlyViewing.brand,
            }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Input is required',
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Brand"
              name="brand"
              rules={[
                {
                  required: true,
                  message: 'Input is required',
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>

          <h3>Prices</h3>
          {
            currentlyViewing.prices.length === 0 ?
              <Tag>NO PRICES AVAILABLE</Tag>
              :
              currentlyViewing.prices.map((item: any, index: number) => (
                <div className={`prices-item 
                ${getCheapestShopLink(currentlyViewing.prices) === item.link ? 'cheapest' : ''}
                `} key={`shop-id-${currentlyViewing.id}-${index}`}>
                  {
                    getCheapestShopLink(currentlyViewing.prices) === item.link ?

                      <Tag color="green" className='cheapest-tag'>
                        Cheapest Shop
                      </Tag>

                      : null
                  }
                  <span className='listing'><b>Shop: </b> {item.shop}</span>
                  <span className='listing'><b>Price: </b> {item.price}</span>
                  <span className='listing'><b>Amount: </b> {item.amount}</span>
                  <span className='listing'><b>Shop Link: </b>
                    <a href={item.link} target="_blank" rel="noreferrer">Visit Link</a>
                  </span>
                </div>
              ))
          }

          <br />
          <br />
          <h3>Chart</h3>
          <Chart
            data={reconstructChartData(currentlyViewing.nutrition)}
          />
        </Modal>
      }
    </div>
  )
}

export default Homepage