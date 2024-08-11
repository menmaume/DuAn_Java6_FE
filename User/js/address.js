const token = "96d82524-2862-11ef-8e53-0a00184fe694"; // Thay thế bằng token thực
const shopId = "192566"; // Thay thế bằng shop ID thực

const provinceId = 220; // ID của tỉnh muốn lấy tên
const districtId = 1574; // ID của quận/huyện muốn lấy tên
const wardId = "550307"; // ID của phường/xã muốn lấy tên

document.addEventListener("DOMContentLoaded", function () {
    fetchProvinces();

    fetchProvinceNameById(provinceId)
        .then((provinceName) => {
            document.getElementById("provinceName").textContent =
                "Tên tỉnh/thành phố: " + provinceName;
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    fetchDistrictNameById(districtId)
        .then((districtName) => {
            document.getElementById("districtName").textContent =
                "Tên quận/huyện: " + districtName;
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    fetchWardNameById(wardId)
        .then((wardName) => {
            document.getElementById("wardName").textContent =
                "Tên phường/xã: " + wardName;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

// Hàm lấy tên tỉnh/thành phố theo ID
function fetchProvinceNameById(provinceId) {
    return fetch(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
            headers: {
                "Content-Type": "application/json",
                Token: token,
            },
        }
    )
        .then((response) => response.json())
        .then((data) => {
            const province = data.data.find(
                (province) => province.ProvinceID === provinceId
            );
            if (province) {
                return province.ProvinceName;
            } else {
                throw new Error("Province not found");
            }
        })
        .catch((error) => {
            console.error("Error fetching province name:", error);
            throw error;
        });
}

// Hàm lấy tên quận/huyện theo ID
function fetchDistrictNameById(districtId) {
    return fetch(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=" +
        provinceId +
        "&shop_id=" +
        shopId,
        {
            headers: {
                "Content-Type": "application/json",
                Token: token,
            },
        }
    )
        .then((response) => response.json())
        .then((data) => {
            const district = data.data.find(
                (district) => district.DistrictID === districtId
            );
            if (district) {
                return district.DistrictName;
            } else {
                throw new Error("District not found");
            }
        })
        .catch((error) => {
            console.error("Error fetching district name:", error);
            throw error;
        });
}

// Hàm lấy tên phường/xã theo ID
function fetchWardNameById(wardId) {
    return fetch(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=" +
        districtId +
        "&shop_id=" +
        shopId,
        {
            headers: {
                "Content-Type": "application/json",
                Token: token,
            },
        }
    )
        .then((response) => response.json())
        .then((data) => {
            const ward = data.data.find((ward) => ward.WardCode === wardId);
            if (ward) {
                return ward.WardName;
            } else {
                throw new Error("Ward not found");
            }
        })
        .catch((error) => {
            console.error("Error fetching ward name:", error);
            throw error;
        });
}

function fetchProvinces() {
    fetch(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
            headers: {
                "Content-Type": "application/json",
                Token: token,
            },
        }
    )
        .then((response) => response.json())
        .then((data) => {
            const provinceSelect = document.getElementById("province");
            const sortedProvinces = data.data.sort((a, b) =>
                a.ProvinceName.localeCompare(b.ProvinceName)
            );
            sortedProvinces.forEach((province) => {
                const option = document.createElement("option");
                option.value = province.ProvinceID;
                option.textContent = province.ProvinceName;
                provinceSelect.appendChild(option);
            });
        })
        .catch((error) => console.error("Error fetching provinces:", error));
}

function fetchDistricts() {
    const provinceId = document.getElementById("province").value;
    if (!provinceId) return;

    fetch(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=" +
        provinceId +
        "&shop_id=" +
        shopId,
        {
            headers: {
                "Content-Type": "application/json",
                Token: token,
            },
        }
    )
        .then((response) => response.json())
        .then((data) => {
            const districtSelect = document.getElementById("district");
            districtSelect.innerHTML =
                '<option value="">Chọn Quận/Huyện</option>';
            const wardSelect = document.getElementById("ward");
            wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
            const sortedDistricts = data.data.sort((a, b) =>
                a.DistrictName.localeCompare(b.DistrictName)
            );
            sortedDistricts.forEach((district) => {
                const option = document.createElement("option");
                option.value = district.DistrictID;
                option.textContent = district.DistrictName;
                districtSelect.appendChild(option);
            });
        })
        .catch((error) => console.error("Error fetching districts:", error));
}

function fetchWards() {
    const districtId = document.getElementById("district").value;
    if (!districtId) return;

    fetch(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=" +
        districtId +
        "&shop_id=" +
        shopId,
        {
            headers: {
                "Content-Type": "application/json",
                Token: token,
            },
        }
    )
        .then((response) => response.json())
        .then((data) => {
            const wardSelect = document.getElementById("ward");
            wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
            const sortedWards = data.data.sort((a, b) =>
                a.WardName.localeCompare(b.WardName)
            );
            sortedWards.forEach((ward) => {
                const option = document.createElement("option");
                option.value = ward.WardCode;
                option.textContent = ward.WardName;
                wardSelect.appendChild(option);
            });
        })
        .catch((error) => console.error("Error fetching wards:", error));
}

// Hàm định dạng số thành tiền tệ
function formatCurrency(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculateShippingFee() {
    const toDistrictId = document.getElementById("district").value;
    const toWardCode = document.getElementById("ward").value;
    if (!toDistrictId || !toWardCode) {
        alert("Vui lòng chọn đầy đủ thông tin địa điểm");
        return;
    }

    const params = new URLSearchParams({
        from_district_id: 1574,
        from_ward_code: "550307",
        service_id: 53320,
        service_type_id: "",
        to_district_id: toDistrictId,
        to_ward_code: toWardCode,
        height: 10,
        length: 10,
        weight: 10,
        width: 10,
        insurance_value: 10000,
        cod_failed_amount: 2000,
        coupon: "",
    });

    fetch(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?" +
        params.toString(),
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Token: token,
                ShopId: shopId,
            },
        }
    )
        .then((response) => response.json())
        .then((data) => {
            const shippingFeeElement = document.getElementById("shippingFee");
            if (data.code === 200 && data.data) {
                const formattedShippingFee = formatCurrency(data.data.total);
                shippingFeeElement.textContent =
                    "Phí vận chuyển: " + formattedShippingFee + " VND";
            } else {
                shippingFeeElement.textContent = "Không thể tính phí vận chuyển";
            }
        })
        .catch((error) => {
            console.error("Error calculating shipping fee:", error);
            document.getElementById("shippingFee").textContent =
                "Lỗi khi tính phí vận chuyển";
        });
}