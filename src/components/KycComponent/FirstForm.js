import { Button, Form, Input, Radio, Select } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Title from "antd/lib/typography/Title"

const Option = Select.Option

const FirstForm = ({ props }) => {
    const [form] = Form.useForm();
    const [optionValue, setOptionValue] = useState("")

    const [isExpertChecked, setIsExpertChecked] = useState(false)
    const [isInvestorChecked, setIsInvestorChecked] = useState(false)
    const [userType, setuserType] = useState("")

    const onChange = (e) => {
        setuserType(e.target.value)
        if (e.target.value == "Expert") {
            setIsExpertChecked(true)
            setIsInvestorChecked(false)
        } else {
            setIsExpertChecked(false);
            setIsInvestorChecked(true);
        }
    }


    const handleSelectValue = (option) => {
        setOptionValue(option)

    }
    const onFinish = async (values) => {
        if (values.username === undefined) {
            toast.error("please enter Username", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (values.username.length < 3) {
            toast.error("Username must be more than 3 value", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (optionValue === "") {
            toast.error("please select Source", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (userType.length < 1) {
            toast.error("please select Expert OR Investor", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            let token = localStorage.getItem('token')
            const headers = {
                'token': token,
            }
            await axios.post("/auth/addDetails", { username: values.username, source: optionValue, referCode: values.referCode, userType: userType }, { headers: headers }).then(async (res) => {
                if (res.data.success) {
                    toast.success(res.data.message, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    await axios.post("auth/progressStep", { step: 1 }, { headers: headers })
                    props(1)
                } else {
                    toast.success(res.data.message, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
        }


    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const InputCard = ({ title, checked, imgPath, points }) => {
        return (
            <div className={checked ? "card checked" : "card"}>
                <div className="header-container">
                    <Title className="card-title">{title}</Title>
                    <img className='img-card' src={imgPath} alt="regular focus"></img>
                </div>
                <ul className='ul-card'>
                    {points.map((point) =>
                        <li key={point.toString()}>{point}</li>
                    )}
                </ul>
            </div >
        );
    }
    return (
        <div >

            <div style={{ paddingBottom: "40px" }}>
                <h3 className="textBlack">Select your username</h3>
                <h1 className="textBlack">Enter the username you want to use to get started with ABCD.</h1>
            </div>
            <div className="firstPageModel">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item label="Username" name="username">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item
                        label="Source"
                    >
                        <Select defaultValue="Select" name="select" onChange={handleSelectValue} required>
                            <Option value="Google">From Google</Option>
                            <Option value="Friend">From Friend</Option>
                            <Option value="Facebook/Twitter">Post on Facebook/Twitter</Option>
                            <Option value="YouTube">From YouTube</Option>
                            <Option value="Other">Other</Option>
                        </Select>
                    </Form.Item>
                    <div>
                        <Radio.Group onChange={onChange} className="cards-container" required>
                            <Radio value="Expert" className="radio-input-card-container">
                                <InputCard
                                    title="Expert"
                                    checked={isExpertChecked}
                                    imgPath="https://image.freepik.com/free-vector/group-friends-giving-high-five_23-2148363170.jpg"
                                    points={["This is a point explain why this card is the best!", "Wow this is also a great point"]} />
                            </Radio>

                            <Radio value="Investor" className="radio-input-card-container">
                                <InputCard
                                    title="Investor"
                                    checked={isInvestorChecked}
                                    imgPath="https://image.freepik.com/free-vector/people-putting-puzzle-pieces-together_52683-28610.jpg"
                                    points={["This point explains why this card is way better", "The other card as shitty points!"]} />
                            </Radio>
                        </Radio.Group>
                    </div>
                    <Form.Item label="Refer Code (Optional)" name="referCode" >
                        <Input placeholder="(Optional)" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default FirstForm;