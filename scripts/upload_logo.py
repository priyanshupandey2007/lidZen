import urllib.request
import json
import ssl

token = "47xskLKKt8vZft9gL40-0hS1TtAWqxLd5aNV4b6eqwA"
base_url = "https://test.dodopayments.com"
brand_id = "bus_0NsQojQdODJdHggdOpAE6"
prod_1 = "pdt_0NsR03OW6DniKgDV9ETzC"
prod_2 = "pdt_0NsR05Gvs4it4UNUGME50"

with open("public/logo.png", "rb") as f:
    logo_data = f.read()

ctx = ssl.create_default_context()

def upload_and_patch_product(prod_id, name):
    print(f"\n--- Processing {name} ({prod_id}) ---")
    req = urllib.request.Request(
        f"{base_url}/products/{prod_id}/images?force_update=true",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        },
        method="PUT"
    )
    with urllib.request.urlopen(req, context=ctx) as res:
        data = json.loads(res.read().decode('utf-8'))
    
    upload_url = data.get("url")
    image_id = data.get("image_id")
    print(f"Got image_id: {image_id}")
    
    # Upload to S3
    s3_req = urllib.request.Request(
        upload_url,
        data=logo_data,
        headers={
            "Content-Type": "image/png"
        },
        method="PUT"
    )
    with urllib.request.urlopen(s3_req, context=ctx) as s3_res:
        print(f"S3 Upload status: {s3_res.status} {s3_res.reason}")
    
    # Patch product with image_id
    patch_req = urllib.request.Request(
        f"{base_url}/products/{prod_id}",
        data=json.dumps({"image_id": image_id}).encode('utf-8'),
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        },
        method="PATCH"
    )
    with urllib.request.urlopen(patch_req, context=ctx) as patch_res:
        raw = patch_res.read().decode('utf-8')
        print(f"Product patch status: {patch_res.status}, response: {raw}")

# 1. Brand Logo
print("\n--- Processing Brand Logo ---")
brand_req = urllib.request.Request(
    f"{base_url}/brands/{brand_id}/images",
    headers={
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    },
    method="PUT"
)
with urllib.request.urlopen(brand_req, context=ctx) as res:
    b_data = json.loads(res.read().decode('utf-8'))

b_upload_url = b_data.get("url")
print(f"Brand presigned URL: {b_upload_url[:70]}...")
b_s3_req = urllib.request.Request(
    b_upload_url,
    data=logo_data,
    headers={"Content-Type": "image/png"},
    method="PUT"
)
with urllib.request.urlopen(b_s3_req, context=ctx) as b_s3_res:
    print(f"Brand S3 Upload status: {b_s3_res.status} {b_s3_res.reason}")

# 2. Product 1
upload_and_patch_product(prod_1, "Single Mac Product")

# 3. Product 2
upload_and_patch_product(prod_2, "Two Macs Product")

print("\nAll brand and product logo configurations completed!")
