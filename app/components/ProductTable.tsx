'use client'

import { useState } from 'react'
import { Product, ProductFormData, AccessoryProduct } from '../types/product'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '../components/ui/badge'
import { Checkbox } from '../components/ui/checkbox'

interface ProductTableProps {
  products: Product[]
  category: Product['category']
  onAdd: (data: ProductFormData) => Promise<void>
  onUpdate: (id: string, data: ProductFormData) => Promise<void>
  onDelete: (id: string) => Promise<void>
  enableImageUpload?: boolean
}

const isAccessoryProduct = (product: Product): product is AccessoryProduct => {
  return product.category === 'accessories';
}

export function ProductTable({ products, category, onAdd, onUpdate, onDelete, enableImageUpload }: ProductTableProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    features: [''],
    location: '',
    isDeal: false,
    active: true,
  })
  const [showForm, setShowForm] = useState(false)

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      features: [''],
      location: '',
      isDeal: false,
      active: true,
      imageUrl: category === 'accessories' ? null : undefined
    })
    setEditingProduct(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const submitData = { ...formData }
      
      // Ensure the Base64 image is properly formatted
      if (submitData.imageUrl && !submitData.imageUrl.startsWith('data:image')) {
        toast.error('Invalid image format')
        return
      }

      // Log the data being sent to Firebase
      console.log('Submitting data:', submitData)

      if (editingProduct) {
        await onUpdate(editingProduct.id, submitData)
        toast.success('Product updated successfully')
      } else {
        await onAdd(submitData)
        toast.success('Product added successfully')
      }
      setShowForm(false)
      resetForm()
    } catch (error) {
      console.error('Error:', error)
      toast.error('An error occurred')
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      features: product.features,
      location: product.location,
      isDeal: product.isDeal,
      active: product.active,
      imageUrl: category === 'accessories' && 'imageUrl' in product ? product.imageUrl : null
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await onDelete(id)
        toast.success('Product deleted successfully')
      } catch (error) {
        toast.error('An error occurred')
      }
    }
  }

  const addFeatureField = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Add size check
      if (file.size > 800 * 1024) { // 800KB limit
        toast.error('Image size should be less than 800KB')
        return
      }

      // Convert image to Base64
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        console.log('Base64 image generated:', base64String.substring(0, 50) + '...')
        setFormData(prev => ({
          ...prev,
          imageUrl: base64String
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddNew = () => {
    resetForm()
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold capitalize">{category} Products</h2>
        <Button onClick={handleAddNew}>Add New Product</Button>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowForm(false)
                  setEditingProduct(null)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full min-h-[100px]"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price === 0 ? '' : formData.price}
                    onChange={(e) => {
                      const value = e.target.value === '' ? 0 : parseFloat(e.target.value)
                      setFormData({ ...formData, price: value })
                    }}
                    className="w-full"
                    required
                    min="0"
                    step="0.01"
                    placeholder="Enter price"
                  />
                </div>

                <div>
                  <Label>Features</Label>
                  <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => {
                            const newFeatures = [...formData.features]
                            newFeatures[index] = e.target.value
                            setFormData({ ...formData, features: newFeatures })
                          }}
                          className="flex-1"
                          placeholder={`Feature ${index + 1}`}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            const newFeatures = formData.features.filter((_, i) => i !== index)
                            setFormData({ ...formData, features: newFeatures })
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setFormData({
                        ...formData,
                        features: [...formData.features, '']
                      })}
                      className="w-full"
                    >
                      Add Feature
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isDeal"
                    checked={formData.isDeal}
                    onCheckedChange={(checked: boolean) => 
                      setFormData({ ...formData, isDeal: checked })
                    }
                  />
                  <Label htmlFor="isDeal">Is Deal</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked: boolean) => 
                      setFormData({ ...formData, active: checked })
                    }
                  />
                  <Label htmlFor="active">Active</Label>
                </div>

                {category === 'accessories' && (
                  <div className="space-y-2">
                    <Label htmlFor="image">Product Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full"
                    />
                    {formData.imageUrl && (
                      <div className="mt-2">
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Add brand input field for accessories */}
                {category === 'accessories' && (
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      name="brand"
                      value={formData.brand || ''}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="Enter brand name"
                    />
                  </div>
                )}

                {/* Add subcategory input field for accessories */}
                {category === 'accessories' && (
                  <div className="space-y-2">
                    <Label htmlFor="subcategory">Category</Label>
                    <select
                      id="subcategory"
                      name="subcategory"
                      value={formData.subcategory || ''}
                      onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select a category</option>
                      <option value="phones">Phones</option>
                      <option value="tablets">Tablets</option>
                      <option value="laptops">Laptops</option>
                      <option value="wireless">Wireless</option>
                      <option value="wearables">Wearables</option>
                      <option value="miscellaneous">Miscellaneous</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                    setEditingProduct(null)
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProduct ? 'Update' : 'Add'} Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell className="max-w-xs truncate">{product.description}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.location}</TableCell>
                <TableCell>
                  <Badge variant={product.active ? "success" : "secondary"}>
                    {product.active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 