import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';


const SecondForm = ({ props }) => {
    const [form] = Form.useForm();
    const [otpForm] = Form.useForm();
    const [isOtpSended, setIsOtpSended] = useState(true)

    const onFinish = async (values) => {

        if (values.MobileNo === undefined) {
            toast.error("please enter Mobile NO.", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (values.MobileNo.length !== 10) {
            toast.error("please enter 10 digit Mobile NO.", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            let token = localStorage.getItem('token')
            const headers = {
                'token': token,
            }
            await axios.post("auth/phoneCode", { phoneNumber: values.MobileNo }, { headers: headers }).then((res) => {
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
                    setIsOtpSended(false)
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
                    form.resetFields();
                }
            })
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinishOTP = async (values) => {
        if (values.OTP.length !== 6) {
            toast.error("please enter 6 digit OTP", {
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
            await axios.post("auth/verifyOtp", { type: "phone", phoneOtp: parseInt(values.OTP) }, { headers: headers }).then(async (res) => {
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
                    form.resetFields();
                    await axios.post("auth/progressStep", { step: 2 }, { headers: headers })

                    props(2);

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


    }
    return (
        <div>
            <div style={{ paddingBottom: "40px" }}>
                <h3 className="textBlack">Verify your mobile Number</h3>
            </div>
            <div className="firstPageModel">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Form.Item label="Mobile No." name="MobileNo"
                            rules={[
                                {
                                    type: Number,
                                    required: true
                                },
                            ]}>
                            <Input maxLength={10} style={{ width: "200%" }} />
                        </Form.Item>
                        <Button type='primary' htmlType="submit" >
                            Send OTP
                        </Button>
                    </div>
                </Form>
                <div>

                    <Form
                        form={otpForm}
                        layout="vertical"
                        onFinish={onFinishOTP}
                        onFinishFailed={onFinishFailed}
                    >
                        <div >
                            <Form.Item label="Enter OTP " name="OTP"  >
                                <Input placeholder="OTP" maxLength={6} style={{ width: "40%" }} />
                            </Form.Item>
                        </div>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={isOtpSended}>Submit</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div >
        </div >
    )

}

export default SecondForm;
