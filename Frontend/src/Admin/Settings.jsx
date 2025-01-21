import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Tabs, Tab } from "react-bootstrap";

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "My E-Commerce Store",
    contactEmail: "admin@store.com",
    contactPhone: "+1234567890",
    operatingHours: "9 AM - 9 PM",
    logo: null,
  });

  const [userSettings, setUserSettings] = useState({
    allowUserRegistration: true,
    enableUserDeactivation: true,
  });

  const [inventorySettings, setInventorySettings] = useState({
    lowStockThreshold: 10,
    defaultCurrency: "USD",
  });

  const [paymentSettings, setPaymentSettings] = useState({
    supportedMethods: ["Credit Card", "PayPal", "Bank Transfer"],
    taxRate: 5, // In percentage
    cancellationPolicy: "Cancellations are allowed within 24 hours of placing an order.",
  });

  const [notificationsSettings, setNotificationsSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });

  const handleSave = (section) => {
    alert(`Settings for ${section} saved successfully!`);
  };

  return (
    <Container fluid className="py-4">
      <h2>Admin Settings</h2>
      <Tabs defaultActiveKey="general" id="settings-tabs" className="mb-3">
        {/* General Settings */}
        <Tab eventKey="general" title="General" tabClassName="custom-tab">
          <Card>
            <Card.Body>
            <h5 style={{ backgroundColor: "#DAA520", color: "white", padding: "10px", borderRadius: "5px" }}>
      General Settings
    </h5>
              <Form>
                <Form.Group controlId="siteName" className="mb-3">
                  <Form.Label>Site Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={generalSettings.siteName}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, siteName: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="contactEmail" className="mb-3">
                  <Form.Label>Contact Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="contactPhone" className="mb-3">
                  <Form.Label>Contact Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={generalSettings.contactPhone}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="operatingHours" className="mb-3">
                  <Form.Label>Operating Hours</Form.Label>
                  <Form.Control
                    type="text"
                    value={generalSettings.operatingHours}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, operatingHours: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="logoUpload" className="mb-3">
                  <Form.Label>Site Logo</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, logo: e.target.files[0] })
                    }
                  />
                </Form.Group>
                <Button onClick={() => handleSave("General Settings")}>Save Changes</Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        {/* User Management */}
        <Tab eventKey="users" title="User Management">
          <Card>
            <Card.Body>
            <h5 style={{ backgroundColor: "#DAA520", color: "white", padding: "10px", borderRadius: "5px" }}>
      User Management
    </h5>
              <Form>
                <Form.Check
                  type="switch"
                  id="allow-registration"
                  label="Allow User Registration"
                  checked={userSettings.allowUserRegistration}
                  onChange={() =>
                    setUserSettings({
                      ...userSettings,
                      allowUserRegistration: !userSettings.allowUserRegistration,
                    })
                  }
                />
                <Form.Check
                  type="switch"
                  id="enable-deactivation"
                  label="Enable User Deactivation"
                  checked={userSettings.enableUserDeactivation}
                  onChange={() =>
                    setUserSettings({
                      ...userSettings,
                      enableUserDeactivation: !userSettings.enableUserDeactivation,
                    })
                  }
                />
                <Button onClick={() => handleSave("User Management")}>Save Changes</Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        {/* Product & Inventory */}
        <Tab eventKey="inventory" title="Inventory">
          <Card>
            <Card.Body>
            <h5 style={{ backgroundColor: "#DAA520", color: "white", padding: "10px", borderRadius: "5px" }}>
      Inventory Settings
    </h5>
              <Form>
                <Form.Group controlId="lowStockThreshold" className="mb-3">
                  <Form.Label>Low Stock Threshold</Form.Label>
                  <Form.Control
                    type="number"
                    value={inventorySettings.lowStockThreshold}
                    onChange={(e) =>
                      setInventorySettings({
                        ...inventorySettings,
                        lowStockThreshold: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="defaultCurrency" className="mb-3">
                  <Form.Label>Default Currency</Form.Label>
                  <Form.Control
                    type="text"
                    value={inventorySettings.defaultCurrency}
                    onChange={(e) =>
                      setInventorySettings({
                        ...inventorySettings,
                        defaultCurrency: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Button onClick={() => handleSave("Inventory Settings")}>Save Changes</Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        {/* Payment & Orders */}
        <Tab eventKey="payment" title="Payment & Orders">
          <Card>
            <Card.Body>
            <h5 style={{ backgroundColor: "#DAA520", color: "white", padding: "10px", borderRadius: "5px" }}>
      Payment & Order settings
    </h5>
              <Form>
                <Form.Group controlId="paymentMethods" className="mb-3">
                  <Form.Label>Supported Payment Methods</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={paymentSettings.supportedMethods.join(", ")}
                    onChange={(e) =>
                      setPaymentSettings({
                        ...paymentSettings,
                        supportedMethods: e.target.value.split(", "),
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="taxRate" className="mb-3">
                  <Form.Label>Tax Rate (%)</Form.Label>
                  <Form.Control
                    type="number"
                    value={paymentSettings.taxRate}
                    onChange={(e) =>
                      setPaymentSettings({ ...paymentSettings, taxRate: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="cancellationPolicy" className="mb-3">
                  <Form.Label>Order Cancellation Policy</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={paymentSettings.cancellationPolicy}
                    onChange={(e) =>
                      setPaymentSettings({
                        ...paymentSettings,
                        cancellationPolicy: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Button onClick={() => handleSave("Payment & Orders")}>Save Changes</Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        {/* Notifications */}
        <Tab eventKey="notifications" title="Notifications">
          <Card>
            <Card.Body>
            <h5 style={{ backgroundColor: "#DAA520", color: "white", padding: "10px", borderRadius: "5px" }}>
      Notifiation Settings
    </h5>
              <Form>
                <Form.Check
                  type="switch"
                  id="email-notifications"
                  label="Enable Email Notifications"
                  checked={notificationsSettings.emailNotifications}
                  onChange={() =>
                    setNotificationsSettings({
                      ...notificationsSettings,
                      emailNotifications: !notificationsSettings.emailNotifications,
                    })
                  }
                />
                <Form.Check
                  type="switch"
                  id="sms-notifications"
                  label="Enable SMS Notifications"
                  checked={notificationsSettings.smsNotifications}
                  onChange={() =>
                    setNotificationsSettings({
                      ...notificationsSettings,
                      smsNotifications: !notificationsSettings.smsNotifications,
                    })
                  }
                />
                <Button onClick={() => handleSave("Notifications")}>Save Changes</Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Settings;
